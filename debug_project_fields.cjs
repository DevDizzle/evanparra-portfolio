const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'evanparra-portfolio-8576-3a8bf'
  });
}

const db = admin.firestore();

async function debugProjects() {
  const ids = ['gammarips-mcp', 'gammarips-engine'];
  
  for (const id of ids) {
    const doc = await db.collection('projects').doc(id).get();
    if (!doc.exists) {
      console.log(`\nDocument ${id} does not exist.`);
      continue;
    }
    console.log(`\n--- ${id} ---`);
    console.log(JSON.stringify(doc.data(), null, 2));
  }
}

debugProjects().catch(console.error);