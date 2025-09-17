"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadContextChunks = loadContextChunks;
exports.clearContextCache = clearContextCache;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const storage_1 = require("firebase-admin/storage");
const CONTEXT_PREFIX = process.env.MD_CONTEXT_PREFIX ?? 'md-context/';
const LOCAL_CONTEXT_DIR = process.env.LOCAL_CONTEXT_DIR ?? node_path_1.default.resolve(__dirname, '../../..', 'md-context');
const CACHE_TTL_MS = Number(process.env.MD_CONTEXT_CACHE_TTL_MS ?? 5 * 60 * 1000);
const CHUNK_SIZE = Number(process.env.MD_CONTEXT_CHUNK_SIZE ?? 1200);
const CHUNK_OVERLAP = Number(process.env.MD_CONTEXT_CHUNK_OVERLAP ?? 200);
let cachedChunks = null;
let lastLoadedAt = 0;
async function loadContextChunks() {
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
    }
    catch (error) {
        console.warn('[contextLoader] Falling back to local context files:', error);
    }
    const localChunks = await loadChunksFromLocal();
    cachedChunks = localChunks;
    lastLoadedAt = now;
    return localChunks;
}
async function loadChunksFromStorage() {
    const bucketName = process.env.MD_CONTEXT_BUCKET ||
        process.env.FIREBASE_STORAGE_BUCKET ||
        (process.env.GCLOUD_PROJECT ? `${process.env.GCLOUD_PROJECT}.appspot.com` : undefined);
    const bucket = bucketName ? (0, storage_1.getStorage)().bucket(bucketName) : (0, storage_1.getStorage)().bucket();
    const [files] = await bucket.getFiles({ prefix: CONTEXT_PREFIX });
    const chunks = [];
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
async function loadChunksFromLocal() {
    const chunks = [];
    try {
        const stats = await node_fs_1.promises.stat(LOCAL_CONTEXT_DIR);
        if (!stats.isDirectory()) {
            return chunks;
        }
    }
    catch (error) {
        console.warn('[contextLoader] Local context directory not found:', error);
        return chunks;
    }
    async function walk(dir) {
        const entries = await node_fs_1.promises.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = node_path_1.default.join(dir, entry.name);
            if (entry.isDirectory()) {
                await walk(fullPath);
                continue;
            }
            if (!entry.name.endsWith('.md')) {
                continue;
            }
            const fileText = await node_fs_1.promises.readFile(fullPath, 'utf-8');
            const relativePath = node_path_1.default.relative(LOCAL_CONTEXT_DIR, fullPath).replace(/\\/g, '/');
            chunks.push(...chunkMarkdown(relativePath, fileText));
        }
    }
    await walk(LOCAL_CONTEXT_DIR);
    return chunks;
}
function chunkMarkdown(filePath, fileText) {
    const cleanText = fileText.replace(/\r\n?/g, '\n').trim();
    if (!cleanText) {
        return [];
    }
    const paragraphs = cleanText.split(/\n{2,}/);
    const chunks = [];
    let buffer = [];
    let bufferLength = 0;
    let chunkIndex = 0;
    const flushBuffer = () => {
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
            const overlap = [];
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
        }
        else {
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
function extractHeading(content) {
    const lines = content.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#')) {
            return trimmed.replace(/^#+\s*/, '');
        }
    }
    return undefined;
}
function clearContextCache() {
    cachedChunks = null;
    lastLoadedAt = 0;
}
