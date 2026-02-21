const admin = require('firebase-admin');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

const projectId = 'evanparra-portfolio-8576-3a8bf';

try {
  initializeApp({ projectId });
} catch (e) {
  if (!admin.apps.length) console.error(e);
}

const db = getFirestore();

async function fixBlogPosts() {
  console.log(`Fixing blog posts in project: ${projectId}...`);
  
  const postsToFix = [
    '3-questions-ai-production',
    'document-processing-ai-small-business',
    'ml-pipeline-production-lessons',
    'why-local-businesses-need-ai-agents-2026'
  ];

  // Set dates relative to today or specific dates you prefer
  const now = new Date();
  
  for (const docId of postsToFix) {
    const docRef = db.collection('blogPosts').doc(docId);
    const doc = await docRef.get();
    
    if (doc.exists) {
      console.log(`Updating ${docId}...`);
      await docRef.update({
        status: 'published',
        publishedAt: Timestamp.fromDate(now), // Setting to now, or you can specify dates
        updatedAt: Timestamp.fromDate(now)
      });
      console.log(`✅ Fixed ${docId}`);
    } else {
      console.log(`❌ Document ${docId} not found!`);
    }
  }
}

fixBlogPosts().catch(console.error);
