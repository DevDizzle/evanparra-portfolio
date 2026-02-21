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
exports.upsertBlogPost = exports.addBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = void 0;
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const firebase_functions_1 = require("firebase-functions");
if (!admin.apps.length) {
    admin.initializeApp();
}
const db = admin.firestore();
const storage = admin.storage();
// Get published posts (paginated)
exports.getBlogPosts = (0, https_1.onCall)(async (request) => {
    const { limit = 10, startAfter, category } = request.data;
    let query = db.collection('blogPosts')
        .where('status', '==', 'published')
        .orderBy('publishedAt', 'desc')
        .limit(limit);
    if (category) {
        query = query.where('category', '==', category);
    }
    if (startAfter) {
        const startDoc = await db.doc(`blogPosts/${startAfter}`).get();
        query = query.startAfter(startDoc);
    }
    const snapshot = await query.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
// Get single post by slug
exports.getBlogPostBySlug = (0, https_1.onCall)(async (request) => {
    const { slug } = request.data;
    const snapshot = await db.collection('blogPosts')
        .where('slug', '==', slug)
        .where('status', '==', 'published')
        .limit(1)
        .get();
    if (snapshot.empty)
        return null;
    const doc = snapshot.docs[0];
    // Increment views
    await doc.ref.update({ views: admin.firestore.FieldValue.increment(1) });
    return { id: doc.id, ...doc.data() };
});
// Create/update post (for automation)
exports.addBlogPost = (0, https_1.onCall)(async (request) => {
    // In production, you'd add authentication checks here
    // if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in');
    const { title, slug: providedSlug, description, content, author, tags = [], imageBase64, imageAlt, featured = false, published = true } = request.data;
    if (!title || !content) {
        throw new https_1.HttpsError('invalid-argument', 'Title and content are required');
    }
    const slug = providedSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let imageUrl = request.data.image || "";
    // Handle image upload if provided as base64
    if (imageBase64) {
        try {
            const bucket = storage.bucket();
            const filePath = `blog/images/${slug}-hero.png`;
            const file = bucket.file(filePath);
            const buffer = Buffer.from(imageBase64, 'base64');
            await file.save(buffer, {
                metadata: { contentType: 'image/png' },
                public: true,
            });
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
        }
        catch (error) {
            firebase_functions_1.logger.error("Error uploading image to storage:", error);
            // Continue without image or handle error
        }
    }
    const postData = {
        title,
        slug,
        description,
        content,
        author: author || "Evan Parra",
        publishedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        tags,
        image: imageUrl,
        imageAlt: imageAlt || title,
        featured,
        status: published ? 'published' : 'draft',
        views: 0
    };
    await db.collection('blogPosts').doc(slug).set(postData, { merge: true });
    return { success: true, slug, image: imageUrl };
});
// Keep upsertBlogPost for backward compatibility if needed, aliased to addBlogPost
exports.upsertBlogPost = exports.addBlogPost;
//# sourceMappingURL=blog.js.map