"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.evanAssistantFlow = exports.ai = void 0;
const genkit_1 = require("genkit");
const vertexai_1 = __importStar(require("@genkit-ai/vertexai"));
const firebase_1 = require("@genkit-ai/firebase");
const contextLoader_1 = require("../lib/contextLoader");
const DEFAULT_LOCATION = process.env.GENKIT_VERTEX_LOCATION ?? 'us-central1';
const DEFAULT_PROJECT = process.env.GENKIT_VERTEX_PROJECT ?? process.env.GCLOUD_PROJECT;
void (0, firebase_1.enableFirebaseTelemetry)().catch((error) => {
    console.warn('[assistant] Failed to enable Firebase telemetry:', error);
});
exports.ai = (0, genkit_1.genkit)({
    plugins: [
        (0, vertexai_1.default)({
            location: DEFAULT_LOCATION,
            projectId: DEFAULT_PROJECT,
        }),
    ],
    model: vertexai_1.gemini15Flash,
});
const chatMessageSchema = genkit_1.z.object({
    role: genkit_1.z.enum(['user', 'assistant']),
    content: genkit_1.z.string(),
});
const flowInputSchema = genkit_1.z.object({
    message: genkit_1.z.string().min(1, 'A message is required.'),
    history: genkit_1.z.array(chatMessageSchema).optional(),
});
const flowOutputSchema = genkit_1.z.object({
    reply: genkit_1.z.string(),
    context: genkit_1.z
        .array(genkit_1.z.object({
        id: genkit_1.z.string(),
        path: genkit_1.z.string(),
        score: genkit_1.z.number(),
        heading: genkit_1.z.string().optional(),
        snippet: genkit_1.z.string(),
    }))
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
exports.evanAssistantFlow = exports.ai.defineFlow({
    name: 'evanAssistant',
    inputSchema: flowInputSchema,
    outputSchema: flowOutputSchema,
}, async ({ message, history }) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
        return {
            reply: 'I need a question or topic to dive into. Could you try asking again with a bit more detail?',
            context: [],
        };
    }
    const contextChunks = await (0, contextLoader_1.loadContextChunks)();
    const rankedChunks = await rankContext(trimmedMessage, contextChunks, 4);
    const contextBlock = buildContextBlock(rankedChunks);
    const conversationHistory = (history ?? []).map((turn) => ({
        role: turn.role === 'assistant' ? 'model' : 'user',
        content: [{ text: turn.content }],
    }));
    const systemPrompt = `${BASE_SYSTEM_PROMPT}\n\nContext:\n${contextBlock || 'No direct context matched—answer using Evan\'s general expertise and invite updates to the knowledge base.'}`;
    const userMessage = {
        role: 'user',
        content: [
            {
                text: `User Query: ${trimmedMessage}\n\nRespond as EvanAI. When you reference the context, mention the source file names from the knowledge base snippets (e.g., bio.md).`,
            },
        ],
    };
    const generateRequest = {
        model: vertexai_1.gemini15Flash,
        system: systemPrompt,
        messages: [...conversationHistory, userMessage],
        config: {
            temperature: 0.35,
            maxOutputTokens: 1024,
        },
    };
    const response = await exports.ai.generate(generateRequest);
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
});
async function rankContext(query, chunks, limit) {
    if (!chunks.length) {
        return [];
    }
    const documents = chunks.map((chunk) => chunk.content);
    let queryEmbedding;
    let chunkEmbeddings = [];
    try {
        const embeddings = await exports.ai.embedMany({
            embedder: vertexai_1.textEmbedding005,
            content: [query, ...documents],
        });
        if (embeddings.length >= documents.length + 1) {
            queryEmbedding = embeddings[0]?.embedding;
            chunkEmbeddings = embeddings.slice(1).map((item) => item.embedding);
        }
    }
    catch (error) {
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
function buildContextBlock(chunks) {
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
function buildSnippet(content) {
    const clean = content.replace(/\s+/g, ' ').trim();
    return clean.length > 240 ? `${clean.slice(0, 237)}...` : clean;
}
function tokenize(text) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, ' ')
        .split(/\s+/)
        .filter((term) => term.length > 2);
}
function scoreLexical(content, queryTerms) {
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
function cosineSimilarity(a, b) {
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
