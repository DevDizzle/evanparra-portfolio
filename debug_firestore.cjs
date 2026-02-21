const admin = require('firebase-admin');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize with default credentials (assumes you are logged in via gcloud or have GOOGLE_APPLICATION_CREDENTIALS set)
// If running in a cloud environment where ADC is available, this suffices.
// If running locally without ADC, we might need a service account key, but let's try ADC first.
// Alternatively, we can try to use the projectId from .firebaserc
const projectId = 'evanparra-portfolio-8576-3a8bf';

process.env.FIRESTORE_EMULATOR_HOST = ''; // Ensure we are NOT using the emulator

try {
  initializeApp({
    projectId: projectId
  });
} catch (e) {
  if (!admin.apps.length) {
    console.error("Failed to initialize app:", e);
    process.exit(1);
  }
}

const db = getFirestore();

async function listBlogPosts() {
  console.log(`Connecting to Firestore project: ${projectId}...`);
  try {
    const snapshot = await db.collection('blogPosts').get();
    
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    console.log(`Found ${snapshot.size} documents in 'blogPosts':`);
    console.log('------------------------------------------------');
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${doc.id}`);
      console.log(`Title: ${data.title}`);
      console.log(`Status: ${data.status}`);
      console.log(`PublishedAt: ${data.publishedAt ? data.publishedAt.toDate() : 'MISSING'}`);
      console.log('------------------------------------------------');
    });
  } catch (error) {
    console.error('Error getting documents:', error);
  }
}

listBlogPosts();
