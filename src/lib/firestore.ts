import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  type DocumentData,
  Timestamp 
} from "firebase/firestore";

// Your web app's Firebase configuration
// For now, we'll assume these are available via public config or env vars
// In a real production app, these should be environment variables
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: Timestamp;
  category: string;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projectsRef = collection(db, "projects");
  const q = query(
    projectsRef, 
    where("featured", "==", true),
    where("status", "==", "active"),
    orderBy("updatedAt", "desc"),
    limit(20)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
}

export async function getAllProjects(): Promise<Project[]> {
  const projectsRef = collection(db, "projects");
  const q = query(
    projectsRef,
    where("status", "==", "active")
  );
  
  const snapshot = await getDocs(q);
  const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  
  return projects.sort((a, b) => {
    // @ts-ignore
    const dateA = a.updatedAt?.seconds || 0;
    // @ts-ignore
    const dateB = b.updatedAt?.seconds || 0;
    return dateB - dateA;
  });
}

export async function getRecentBlogPosts(count = 3): Promise<BlogPost[]> {
  const blogRef = collection(db, "blogPosts");
  const q = query(
    blogRef,
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(count)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.description, // Map description to excerpt
      coverImage: data.image, // Map image to coverImage
      publishedAt: data.publishedAt,
      category: data.tags?.[0] || 'Tech' // Use first tag or default
    } as BlogPost;
  });
}

export { db };
