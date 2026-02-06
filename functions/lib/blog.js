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
exports.upsertBlogPost = exports.getBlogPostBySlug = exports.getBlogPosts = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const db = admin.firestore();
// Get published posts (paginated)
exports.getBlogPosts = functions.https.onCall(async (request) => {
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
exports.getBlogPostBySlug = functions.https.onCall(async (request) => {
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
exports.upsertBlogPost = functions.https.onCall(async (request) => {
    // Verify caller is authorized (service account or admin)
    // In production, check request.auth.token.admin or similar
    const { post } = request.data;
    const docRef = post.id
        ? db.collection('blogPosts').doc(post.id)
        : db.collection('blogPosts').doc();
    await docRef.set({
        ...post,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        publishedAt: post.publishedAt || admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    return { id: docRef.id };
});
//# sourceMappingURL=blog.js.map