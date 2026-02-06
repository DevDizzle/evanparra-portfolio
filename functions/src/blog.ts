import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Get published posts (paginated)
export const getBlogPosts = functions.https.onCall(async (request) => {
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
export const getBlogPostBySlug = functions.https.onCall(async (request) => {
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
export const upsertBlogPost = functions.https.onCall(async (request) => {
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
