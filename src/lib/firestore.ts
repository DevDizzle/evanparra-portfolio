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
  authDomain: "evanparra-portfolio-8576-3a8bf.firebaseapp.com",
  projectId: "evanparra-portfolio-8576-3a8bf",
  storageBucket: "evanparra-portfolio-8576-3a8bf.firebasestorage.app",
  messagingSenderId: "1056382024227",
  appId: "1:1056382024227:web:c842145391694f83733075"
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
    limit(6)
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
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
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
}

export { db };
