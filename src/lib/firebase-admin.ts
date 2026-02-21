import { initializeApp as initializeAdminApp, getApps as getAdminApps, getApp as getAdminApp, cert } from 'firebase-admin/app';
import { getFirestore as getAdminFirestore, Timestamp } from 'firebase-admin/firestore';
import { getStorage as getAdminStorage } from 'firebase-admin/storage';
import { config } from 'dotenv';

// Load environment variables
config();

// Define interface for BlogPost
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags: string[];
  featured: boolean;
  ogImage: string | null;
  status?: string;
}

// Initialize Admin SDK
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// Replace escaped newlines from environment variable
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let adminApp;

if (!getAdminApps().length) {
  if (projectId && clientEmail && privateKey) {
    adminApp = initializeAdminApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET || `${projectId}.firebasestorage.app`
    });
  } else {
      // Fallback for build environments where secrets might not be present (prevents crash)
      console.warn("Firebase Admin secrets not found. Skipping Admin initialization.");
  }
} else {
  adminApp = getAdminApp();
}

// Export Admin services (check existence first)
export const adminDb = adminApp ? getAdminFirestore(adminApp) : null;
export const adminStorage = adminApp ? getAdminStorage(adminApp) : null;

// --- Blog Functions ---

export async function getBlogPostsAdmin(): Promise<BlogPost[]> {
  if (!adminDb) return [];
  try {
    const snapshot = await adminDb.collection('blogPosts')
      .orderBy('publishedAt', 'desc')
      .get();
    
    const posts: BlogPost[] = [];
    
    snapshot.forEach(doc => {
      const data = doc.data();
      // Handle timestamp conversion
      let publishedAt = new Date().toISOString();
      if (data.publishedAt) {
        if (data.publishedAt instanceof Timestamp) {
          publishedAt = data.publishedAt.toDate().toISOString();
        } else if (typeof data.publishedAt === 'string') {
          publishedAt = data.publishedAt;
        }
      }

      posts.push({
        slug: doc.id,
        title: data.title || 'Untitled',
        excerpt: data.description || '', // Mapping description to excerpt
        content: data.content || '',
        publishedAt,
        author: data.author || 'Evan Parra',
        tags: data.tags || [],
        featured: data.featured || false,
        ogImage: data.image || null, // Mapping image to ogImage
        status: data.status || 'published'
      });
    });
    
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPostAdmin(slug: string): Promise<BlogPost | null> {
  if (!adminDb) return null;
  try {
    const docSnap = await adminDb.collection('blogPosts').doc(slug).get();
    
    if (!docSnap.exists) {
      return null;
    }
    
    const data = docSnap.data();
    if (!data) return null;

    // Handle timestamp conversion
    let publishedAt = new Date().toISOString();
    if (data.publishedAt) {
      if (data.publishedAt instanceof Timestamp) {
        publishedAt = data.publishedAt.toDate().toISOString();
      } else if (typeof data.publishedAt === 'string') {
        publishedAt = data.publishedAt;
      }
    }

    return {
      slug: docSnap.id,
      title: data.title || 'Untitled',
      excerpt: data.description || '',
      content: data.content || '',
      publishedAt,
      author: data.author || 'Evan Parra',
      tags: data.tags || [],
      featured: data.featured || false,
      ogImage: data.image || null,
      status: data.status || 'published'
    };
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

export async function addBlogPostAdmin(data: any): Promise<string> {
    if (!adminDb) throw new Error("Firebase Admin not initialized");
    
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    await adminDb.collection('blogPosts').doc(slug).set({
        ...data,
        slug,
        publishedAt: data.publishedAt ? Timestamp.fromDate(new Date(data.publishedAt)) : Timestamp.now(),
        updatedAt: Timestamp.now()
    }, { merge: true });

    return slug;
}
