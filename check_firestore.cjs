const admin = require('firebase-admin');

// Initialize Admin SDK (assumes default credentials or already set up in environment)
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'evanparra-portfolio-8576-3a8bf'
  });
}

const db = admin.firestore();

async function checkProjects() {
  console.log("Checking projects collection...");
  const snapshot = await db.collection('projects').get();
  
  if (snapshot.empty) {
    console.log("No documents found in 'projects' collection.");
    return;
  }

  console.log(`Found ${snapshot.size} documents.`);
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`  - featured: ${data.featured} (${typeof data.featured})`);
    console.log(`  - status: ${data.status} (${typeof data.status})`);
    console.log(`  - updatedAt: ${data.updatedAt ? data.updatedAt.toDate() : 'MISSING'}`);
    console.log(`  - title: ${data.title}`);
  });
}

checkProjects().catch(console.error);
