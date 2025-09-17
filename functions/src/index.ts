import type { Request, Response } from 'express';
import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2/options';
import { getApps, initializeApp, type AppOptions } from 'firebase-admin/app';
import { evanAssistantFlow } from './flows/assistant';

const REGION = process.env.FUNCTIONS_REGION ?? 'us-central1';
const MEMORY = (process.env.FUNCTIONS_MEMORY as
  | '128MiB'
  | '256MiB'
  | '512MiB'
  | '1GiB'
  | '2GiB'
  | '4GiB'
  | '8GiB'
  | '16GiB'
  | undefined) ?? '1GiB';
const MAX_INSTANCES = process.env.FUNCTIONS_MAX_INSTANCES
  ? Number(process.env.FUNCTIONS_MAX_INSTANCES)
  : 2;

setGlobalOptions({
  region: REGION,
  memory: MEMORY,
  maxInstances: Number.isNaN(MAX_INSTANCES) ? undefined : MAX_INSTANCES,
  timeoutSeconds: 120,
});

const appOptions: AppOptions = {};
const storageBucket = process.env.MD_CONTEXT_BUCKET || process.env.FIREBASE_STORAGE_BUCKET;
if (storageBucket) {
  appOptions.storageBucket = storageBucket;
}

if (!getApps().length) {
  initializeApp(appOptions);
}

const allowedOrigins = process.env.CHAT_ALLOWED_ORIGINS
  ? process.env.CHAT_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['*'];

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) {
    return allowedOrigins.includes('*');
  }
  return allowedOrigins.includes('*') || allowedOrigins.includes(origin);
}

function applyCors(res: Response, origin: string | undefined): void {
  if (origin && isOriginAllowed(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (allowedOrigins.includes('*')) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '3600');
}

export const chat = onRequest(async (req: Request, res: Response) => {
  applyCors(res, req.headers.origin);

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed. Use POST.' });
    return;
  }

  if (!isOriginAllowed(req.headers.origin)) {
    res.status(403).json({ error: 'Origin not allowed.' });
    return;
  }

  let payload: any = req.body;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      res.status(400).json({ error: 'Invalid JSON payload.' });
      return;
    }
  }

  const message = typeof payload?.message === 'string' ? payload.message : '';
  const history = Array.isArray(payload?.history)
    ? payload.history.filter((turn: any) =>
        turn &&
        typeof turn.content === 'string' &&
        (turn.role === 'user' || turn.role === 'assistant')
      )
    : [];

  if (!message.trim()) {
    res.status(400).json({ error: 'A non-empty "message" field is required.' });
    return;
  }

  try {
    const assistantResponse = await evanAssistantFlow({
      message,
      history,
    });
    res.status(200).json(assistantResponse);
  } catch (error) {
    console.error('[chat] Failed to process request', error);
    res.status(500).json({
      error: 'Assistant failed to generate a response. Try again in a moment.',
    });
  }
});
