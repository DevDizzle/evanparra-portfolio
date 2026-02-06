import { onSchedule } from "firebase-functions/v2/scheduler";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import axios from "axios";
import * as logger from "firebase-functions/logger";

const db = admin.firestore();

const TARGET_REPOS = [
  "gammarips-engine",
  "gammarips-mcp",
  "gammarips-webapp",
  "gammarips-models",
  "smart-city",
  "galaqtiq-invoice-agent",
  "serverless-pii-vault",
  "evanparra-portfolio"
];

const GITHUB_USERNAME = "devdizzle";

// Sync function logic
async function syncPortfolioLogic() {
  logger.info("Starting GitHub Portfolio Sync...");
  
  try {
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
      const docRef = db.collection('projects').doc(repo.name);
      
      const projectData = {
        slug: repo.name,
        title: repo.name,
        description: repo.description || "No description provided.",
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || "",
        status: "active",
        featured: true,
        technologies: [repo.language].filter(Boolean),
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updatedAt: admin.firestore.Timestamp.fromDate(new Date(repo.updated_at)),
        syncedAt: admin.firestore.FieldValue.serverTimestamp()
      };

      batch.set(docRef, projectData, { merge: true });
    }

    await batch.commit();
    logger.info(`Successfully synced ${syncedRepos.length} repositories.`);
    return { success: true, count: syncedRepos.length };

  } catch (error: any) {
    logger.error("Error syncing GitHub portfolio:", error);
    throw error;
  }
}

// Scheduled Trigger (Every 24 hours)
export const syncGitHubPortfolio = onSchedule("every 24 hours", async (event) => {
  await syncPortfolioLogic();
});

// Manual Trigger (Callable)
export const manualSyncPortfolio = onCall({ cors: true }, async (request) => {
  logger.info("Manual Sync Triggered by User");
  try {
    return await syncPortfolioLogic();
  } catch (error: any) {
    throw new HttpsError('internal', error.message);
  }
});