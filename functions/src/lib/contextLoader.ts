import path from 'node:path';
import { promises as fs } from 'node:fs';
import { getStorage } from 'firebase-admin/storage';

export interface ContextChunk {
  id: string;
  path: string;
  content: string;
  heading?: string;
}

const CONTEXT_PREFIX = process.env.MD_CONTEXT_PREFIX ?? 'md-context/';
const LOCAL_CONTEXT_DIR =
  process.env.LOCAL_CONTEXT_DIR ?? path.resolve(__dirname, '../../..', 'md-context');
const CACHE_TTL_MS = Number(process.env.MD_CONTEXT_CACHE_TTL_MS ?? 5 * 60 * 1000);
const CHUNK_SIZE = Number(process.env.MD_CONTEXT_CHUNK_SIZE ?? 1200);
const CHUNK_OVERLAP = Number(process.env.MD_CONTEXT_CHUNK_OVERLAP ?? 200);

let cachedChunks: ContextChunk[] | null = null;
let lastLoadedAt = 0;

export async function loadContextChunks(): Promise<ContextChunk[]> {
  const now = Date.now();
  if (cachedChunks && now - lastLoadedAt < CACHE_TTL_MS) {
    return cachedChunks;
  }

  try {
    const storageChunks = await loadChunksFromStorage();
    if (storageChunks.length) {
      cachedChunks = storageChunks;
      lastLoadedAt = now;
      return storageChunks;
    }
  } catch (error) {
    console.warn('[contextLoader] Falling back to local context files:', error);
  }

  const localChunks = await loadChunksFromLocal();
  cachedChunks = localChunks;
  lastLoadedAt = now;
  return localChunks;
}

async function loadChunksFromStorage(): Promise<ContextChunk[]> {
  const bucketName =
    process.env.MD_CONTEXT_BUCKET ||
    process.env.FIREBASE_STORAGE_BUCKET ||
    (process.env.GCLOUD_PROJECT ? `${process.env.GCLOUD_PROJECT}.appspot.com` : undefined);
  const bucket = bucketName ? getStorage().bucket(bucketName) : getStorage().bucket();

  const [files] = await bucket.getFiles({ prefix: CONTEXT_PREFIX });
  const chunks: ContextChunk[] = [];
  for (const file of files) {
    if (!file.name || file.name.endsWith('/')) {
      continue;
    }
    const [buffer] = await file.download();
    const text = buffer.toString('utf-8');
    const relativePath = file.name.replace(CONTEXT_PREFIX, '');
    chunks.push(...chunkMarkdown(relativePath, text));
  }
  return chunks;
}

async function loadChunksFromLocal(): Promise<ContextChunk[]> {
  const chunks: ContextChunk[] = [];
  try {
    const stats = await fs.stat(LOCAL_CONTEXT_DIR);
    if (!stats.isDirectory()) {
      return chunks;
    }
  } catch (error) {
    console.warn('[contextLoader] Local context directory not found:', error);
    return chunks;
  }

  async function walk(dir: string): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(fullPath);
        continue;
      }
      if (!entry.name.endsWith('.md')) {
        continue;
      }
      const fileText = await fs.readFile(fullPath, 'utf-8');
      const relativePath = path.relative(LOCAL_CONTEXT_DIR, fullPath).replace(/\\/g, '/');
      chunks.push(...chunkMarkdown(relativePath, fileText));
    }
  }

  await walk(LOCAL_CONTEXT_DIR);
  return chunks;
}

function chunkMarkdown(filePath: string, fileText: string): ContextChunk[] {
  const cleanText = fileText.replace(/\r\n?/g, '\n').trim();
  if (!cleanText) {
    return [];
  }

  const paragraphs = cleanText.split(/\n{2,}/);
  const chunks: ContextChunk[] = [];
  let buffer: string[] = [];
  let bufferLength = 0;
  let chunkIndex = 0;

  const flushBuffer = (): void => {
    if (!buffer.length) {
      return;
    }
    const content = buffer.join('\n\n');
    chunks.push({
      id: `${filePath}#${chunkIndex}`,
      path: filePath,
      content,
      heading: extractHeading(content),
    });
    chunkIndex += 1;
    if (CHUNK_OVERLAP > 0 && buffer.length > 1) {
      const overlap: string[] = [];
      let overlapLength = 0;
      for (let i = buffer.length - 1; i >= 0; i -= 1) {
        const paragraph = buffer[i];
        overlap.unshift(paragraph);
        overlapLength += paragraph.length;
        if (overlapLength >= CHUNK_OVERLAP) {
          break;
        }
      }
      buffer = overlap;
      bufferLength = overlap.reduce((total, paragraph) => total + paragraph.length, 0);
    } else {
      buffer = [];
      bufferLength = 0;
    }
  };

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) {
      continue;
    }
    if (bufferLength + trimmed.length > CHUNK_SIZE && buffer.length) {
      flushBuffer();
    }
    buffer.push(trimmed);
    bufferLength += trimmed.length;
  }
  if (buffer.length) {
    flushBuffer();
  }

  return chunks;
}

function extractHeading(content: string): string | undefined {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      return trimmed.replace(/^#+\s*/, '');
    }
  }
  return undefined;
}

export function clearContextCache(): void {
  cachedChunks = null;
  lastLoadedAt = 0;
}
