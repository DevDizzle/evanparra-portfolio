import { genkit, z } from 'genkit';
import type { GenerateOptions, MessageData } from 'genkit';
import vertexAI, { gemini15Flash, textEmbedding005 } from '@genkit-ai/vertexai';
import { enableFirebaseTelemetry } from '@genkit-ai/firebase';
import { loadContextChunks, type ContextChunk } from '../lib/contextLoader';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AssistantResponse {
  reply: string;
  context: Array<{
    id: string;
    path: string;
    score: number;
    heading?: string;
    snippet: string;
  }>;
}

const DEFAULT_LOCATION = process.env.GENKIT_VERTEX_LOCATION ?? 'us-central1';
const DEFAULT_PROJECT = process.env.GENKIT_VERTEX_PROJECT ?? process.env.GCLOUD_PROJECT;

void enableFirebaseTelemetry().catch((error) => {
  console.warn('[assistant] Failed to enable Firebase telemetry:', error);
});

export const ai = genkit({
  plugins: [
    vertexAI({
      location: DEFAULT_LOCATION,
      projectId: DEFAULT_PROJECT,
    }),
  ],
  model: gemini15Flash,
});

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const flowInputSchema = z.object({
  message: z.string().min(1, 'A message is required.'),
  history: z.array(chatMessageSchema).optional(),
});

const flowOutputSchema = z.object({
  reply: z.string(),
  context: z
    .array(
      z.object({
        id: z.string(),
        path: z.string(),
        score: z.number(),
        heading: z.string().optional(),
        snippet: z.string(),
      })
    )
    .optional(),
});

const BASE_SYSTEM_PROMPT = `You are EvanAI, a highly knowledgeable digital assistant embodying the expertise of Evan R. Parra, an Applied AI Engineer, ML Specialist, and Prompt Engineering Coach. You know everything about Evan from the provided context files: his background, projects (e.g., ProfitScout for AI-driven business insights, MaculaCutis for medical AI imaging), consulting services for SMBs, and prompt engineering sessions for teens at $75/hour. Your responses are professional, insightful, and proactive—always tying back to Evan's real-world AI engineering skills to inspire visitors.

Core Guidelines:
- Personalized Knowledge: Use the injected context to answer accurately. Context comes from MD files that may include placeholder sections. If a placeholder is empty or generic, call it out and suggest how Evan can expand it.
- Brand as an AI Engineer: Highlight Evan's engineering process, offer Genkit, Vertex AI, or Firebase implementation ideas, and suggest sample code when helpful.
- Engage Visitors: Encourage follow-up actions like booking consulting sessions or exploring GitHub repositories.
- Interactive & Educational: Be encouraging for teens learning prompt engineering and provide hands-on exercises when relevant.
- Tone: Confident, approachable, and innovative. Close with a forward-looking call-to-action.
- Limits: Stay on Evan's brand and expertise. If unsure, offer Evan's best engineering take.`;

export const evanAssistantFlow = ai.defineFlow(
  {
    name: 'evanAssistant',
    inputSchema: flowInputSchema,
    outputSchema: flowOutputSchema,
  },
  async ({ message, history }): Promise<AssistantResponse> => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return {
        reply: 'I need a question or topic to dive into. Could you try asking again with a bit more detail?',
        context: [],
      };
    }

    const contextChunks = await loadContextChunks();
    const rankedChunks = await rankContext(trimmedMessage, contextChunks, 4);
    const contextBlock = buildContextBlock(rankedChunks);

    const conversationHistory: MessageData[] = (history ?? []).map((turn) => ({
      role: turn.role === 'assistant' ? 'model' : 'user',
      content: [{ text: turn.content }],
    }));

    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nContext:\n${contextBlock || 'No direct context matched—answer using Evan\'s general expertise and invite updates to the knowledge base.'}`;

    const userMessage: MessageData = {
      role: 'user',
      content: [
        {
          text: `User Query: ${trimmedMessage}\n\nRespond as EvanAI. When you reference the context, mention the source file names from the knowledge base snippets (e.g., bio.md).` as const,
        },
      ],
    };

    const generateRequest = {
      model: gemini15Flash,
      system: systemPrompt,
      messages: [...conversationHistory, userMessage],
      config: {
        temperature: 0.35,
        maxOutputTokens: 1024,
      },
    } satisfies GenerateOptions;

    const response = await ai.generate(generateRequest);
    const reply = response.text.trim();

    return {
      reply: reply || 'I want to make sure I get this right. Could you clarify what you need about Evan\'s work?',
      context: rankedChunks.map(({ id, path, heading, snippet, score }) => ({
        id,
        path,
        heading,
        snippet,
        score,
      })),
    };
  }
);

type RankedChunk = ContextChunk & {
  score: number;
  snippet: string;
};

async function rankContext(
  query: string,
  chunks: ContextChunk[],
  limit: number
): Promise<RankedChunk[]> {
  if (!chunks.length) {
    return [];
  }

  const documents = chunks.map((chunk) => chunk.content);
  let queryEmbedding: number[] | undefined;
  let chunkEmbeddings: number[][] = [];

  try {
    const embeddings = await ai.embedMany({
      embedder: textEmbedding005,
      content: [query, ...documents],
    });

    if (embeddings.length >= documents.length + 1) {
      queryEmbedding = embeddings[0]?.embedding;
      chunkEmbeddings = embeddings.slice(1).map((item) => item.embedding);
    }
  } catch (error) {
    console.warn('[assistant] Failed to generate embeddings, falling back to keyword scoring:', error);
  }

  const queryTerms = tokenize(query);
  const ranked = chunks.map((chunk, index) => {
    const lexicalScore = scoreLexical(chunk.content, queryTerms);
    const embeddingScore = queryEmbedding && chunkEmbeddings[index]
      ? cosineSimilarity(queryEmbedding, chunkEmbeddings[index])
      : 0;
    const score = embeddingScore * 0.8 + lexicalScore * 0.2;
    return {
      ...chunk,
      score,
      snippet: buildSnippet(chunk.content),
    };
  });

  return ranked
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((chunk) => chunk.score > 0 || ranked.indexOf(chunk) < 2);
}

function buildContextBlock(chunks: RankedChunk[]): string {
  if (!chunks.length) {
    return '';
  }
  return chunks
    .map((chunk) => {
      const header = chunk.heading ? `${chunk.heading}\n` : '';
      return `Source: ${chunk.path}\n${header}${chunk.content}`;
    })
    .join('\n\n---\n\n');
}

function buildSnippet(content: string): string {
  const clean = content.replace(/\s+/g, ' ').trim();
  return clean.length > 240 ? `${clean.slice(0, 237)}...` : clean;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 2);
}

function scoreLexical(content: string, queryTerms: string[]): number {
  if (!queryTerms.length) {
    return 0.05;
  }
  const lowered = content.toLowerCase();
  let score = 0;
  for (const term of queryTerms) {
    if (!term) {
      continue;
    }
    const occurrences = lowered.split(term).length - 1;
    score += occurrences;
  }
  return score > 0 ? score : 0.05;
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (!a?.length || !b?.length || a.length !== b.length) {
    return 0;
  }
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i += 1) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (!magA || !magB) {
    return 0;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
