const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'evanparra-portfolio-8576-3a8bf'
  });
}

const db = admin.firestore();

const projectsToRestore = [
  {
    id: 'gammarips-mcp',
    data: {
      title: "gammarips-mcp",
      description: "AI-powered financial intelligence server built on the Model Context Protocol. Integrates GCP BigQuery and LLMs to automate high-gamma options strategies, market structure analysis, and technical reporting for actionable trading insights.",
      technologies: ["Python"]
    }
  },
  {
    id: 'gammarips-engine',
    data: {
      title: "gammarips-engine",
      description: "An end-to-end, serverless AI platform built on Google Cloud that automatically ingests and analyzes financial data to generate actionable trading signals for the Russell 1000. This repository contains the full data pipeline that powers the ProfitScout application.",
      technologies: ["Python"]
    }
  }
];

async function revertProjects() {
  console.log('Reverting projects in Firestore...');
  
  for (const project of projectsToRestore) {
    const docRef = db.collection('projects').doc(project.id);
    const doc = await docRef.get();
    
    if (doc.exists) {
      await docRef.set(project.data, { merge: true });
      console.log(`Reverted ${project.id}`);
    } else {
      console.warn(`Project ${project.id} not found!`);
    }
  }
  console.log('Revert complete.');
}

revertProjects().catch(console.error);
