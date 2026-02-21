import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();
const storage = admin.storage();

// Get published posts (paginated)
export const getBlogPosts = onCall(async (request) => {
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
export const getBlogPostBySlug = onCall(async (request) => {
  const { slug } = request.data;
  const snapshot = await db.collection('blogPosts')
    .where('slug', '==', slug)
    .where('status', '==', 'published')
    .limit(1)
    .get();
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  
  // Increment views
  await doc.ref.update({ views: admin.firestore.FieldValue.increment(1) });
  
  return { id: doc.id, ...doc.data() };
});

// Create/update post (for automation)
export const addBlogPost = onCall(async (request) => {
  // In production, you'd add authentication checks here
  // if (!request.auth) throw new HttpsError('unauthenticated', 'Must be logged in');

  const { 
    title, 
    slug: providedSlug, 
    description, 
    content, 
    author, 
    tags = [], 
    imageBase64, 
    imageAlt, 
    featured = false, 
    published = true 
  } = request.data;

  if (!title || !content) {
    throw new HttpsError('invalid-argument', 'Title and content are required');
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
    } catch (error) {
      logger.error("Error uploading image to storage:", error);
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
export const upsertBlogPost = addBlogPost;