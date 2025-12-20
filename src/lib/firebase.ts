import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY || "demo-key",
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const functions = getFunctions(app, 'us-central1');

console.log("[Firebase Debug] Project ID:", firebaseConfig.projectId);
console.log("[Firebase Debug] Functions Endpoint:", functions.customDomain || `https://us-central1-${firebaseConfig.projectId}.cloudfunctions.net`);


// Connect to emulators in development
// Note: You must ensure your emulators are running on these ports
if (import.meta.env.DEV) {
    console.log("Connecting to Firebase Functions Emulator...");
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export const bookingAgent = httpsCallable(functions, 'bookingAgentFlow');
export const visionAnalysis = httpsCallable(functions, 'visionAnalysisFlow');