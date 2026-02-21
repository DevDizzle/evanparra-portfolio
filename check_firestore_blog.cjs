const admin = require('firebase-admin');

// Initialize Admin SDK (assumes default credentials or already set up in environment)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'evanparra-portfolio-8576-3a8bf'
  });
}

const db = admin.firestore();

async function checkBlogPosts() {
  console.log("Checking blogPosts collection...");
  const snapshot = await db.collection('blogPosts').get();
  
  if (snapshot.empty) {
    console.log("No documents found in 'blogPosts' collection.");
    return;
  }

  console.log(`Found ${snapshot.size} documents.`);
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`  - title: ${data.title}`);
    console.log(`  - slug: ${data.slug}`);
    console.log(`  - publishedAt: ${data.publishedAt ? data.publishedAt.toDate() : 'MISSING'}`);
    console.log(`  - coverImage: ${data.coverImage ? 'Present' : 'MISSING'}`);
    console.log(`  - status: ${data.status}`);
  });
}

checkBlogPosts().catch(console.error);
