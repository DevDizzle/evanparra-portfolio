import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";

const db = admin.firestore();

const TARGET_REPOS = [
  "gammarips-engine",
  "gammarips-mcp",
  "gammarips-webapp",
  "gammarips-models",
  "smart-city",
  "galaqtiq-invoice-agent",
  "serverless-pii-vault",
  "evanparra-portfolio" // Adding self
];

const GITHUB_USERNAME = "devdizzle";

export const syncGitHubPortfolio = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  console.log("Starting GitHub Portfolio Sync...");
  
  try {
    // Fetch all public repos for user
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Firebase-Cloud-Function'
      }
    });

    const repos = response.data;
    const batch = db.batch();
    
    // Filter and map to Firestore
    const syncedRepos = repos.filter((repo: any) => TARGET_REPOS.includes(repo.name));
    
    for (const repo of syncedRepos) {
      const docRef = db.collection('projects').doc(repo.name); // ID is repo name
      
      const projectData = {
        slug: repo.name,
        title: repo.name, // Can be overridden manually in Firestore later
        description: repo.description || "No description provided.",
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || "",
        status: "active",
        featured: true, // Default to featured if in target list
        technologies: [repo.language].filter(Boolean), // Start with main lang
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updatedAt: admin.firestore.Timestamp.fromDate(new Date(repo.updated_at)),
        syncedAt: admin.firestore.FieldValue.serverTimestamp()
        // Note: 'coverImage' and 'longDescription' should be managed manually in Firestore
        // This sync script should ideally use { merge: true } to not overwrite manual enhancements
      };

      batch.set(docRef, projectData, { merge: true });
    }

    await batch.commit();
    console.log(`Successfully synced ${syncedRepos.length} repositories.`);
    return null;

  } catch (error) {
    console.error("Error syncing GitHub portfolio:", error);
    return null;
  }
});

// Manual trigger for testing/seeding
export const manualSyncPortfolio = functions.https.onCall(async (request) => {
  // Reuse logic or just call the same internal function if refactored
  // For simplicity, replicating/calling logic here.
  // In a real app, extract the logic to a shared helper.
  
  console.log("Manual Sync Triggered");
  try {
    const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
        headers: { 'User-Agent': 'Firebase-Cloud-Function' }
    });
    
    const repos = response.data;
    const batch = db.batch();
    const syncedRepos = repos.filter((repo: any) => TARGET_REPOS.includes(repo.name));

    for (const repo of syncedRepos) {
        const docRef = db.collection('projects').doc(repo.name);
        batch.set(docRef, {
            slug: repo.name,
            title: repo.name,
            description: repo.description,
            githubUrl: repo.html_url,
            status: "active",
            featured: true,
            technologies: [repo.language].filter(Boolean),
            stargazers_count: repo.stargazers_count,
            updatedAt: admin.firestore.Timestamp.fromDate(new Date(repo.updated_at)),
            syncedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }
    
    await batch.commit();
    return { success: true, count: syncedRepos.length };
  } catch (error: any) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
