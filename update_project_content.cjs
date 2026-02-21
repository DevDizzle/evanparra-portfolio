const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'evanparra-portfolio-8576-3a8bf'
  });
}

const db = admin.firestore();

const projectsToUpdate = [
  {
    id: 'gammarips-mcp',
    data: {
      title: "GammaRips MCP Server",
      description: "Model Context Protocol server exposing real-time options flow, gamma analysis, and signal generation to AI agents. Built on Cloud Run with sub-second latency.",
      technologies: ["MCP", "Cloud Run", "TypeScript", "Real-time Data"]
    }
  },
  {
    id: 'gammarips-engine',
    data: {
      title: "GammaRips ML Pipeline",
      description: "End-to-end options analysis pipeline: data ingestion, feature engineering, signal scoring, and performance tracking. Processes 500+ daily signals at <$50/mo infrastructure cost.",
      technologies: ["Python", "BigQuery", "Vertex AI", "Cloud Functions"]
    }
  }
];

async function updateProjects() {
  console.log('Updating projects in Firestore...');
  
  for (const project of projectsToUpdate) {
    const docRef = db.collection('projects').doc(project.id);
    const doc = await docRef.get();
    
    if (doc.exists) {
      // Merge with existing data (keeping githubUrl, syncedAt, etc.)
      await docRef.set(project.data, { merge: true });
      console.log(`Updated ${project.id}`);
    } else {
      console.warn(`Project ${project.id} not found!`);
    }
  }
  console.log('Update complete.');
}

updateProjects().catch(console.error);
