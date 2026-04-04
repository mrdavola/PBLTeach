/**
 * Export exemplar projects from Firestore to a static JSON file.
 * Run: npx tsx scripts/export-exemplars.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { writeFileSync } from "fs";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

async function main() {
  console.log("Fetching exemplar projects from Firestore...");

  const q = query(
    collection(db, "community"),
    where("userId", "==", "pblteach-team"),
  );
  const snap = await getDocs(q);

  const projects = snap.docs.map((d) => {
    const data = d.data();
    // Convert Timestamps to ISO strings for JSON serialization
    return {
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      published: {
        ...data.published,
        publishedAt: data.published?.publishedAt?.toDate?.()?.toISOString() ?? new Date().toISOString(),
      },
    };
  });

  const outPath = "src/lib/data/exemplar-projects.json";
  writeFileSync(outPath, JSON.stringify(projects, null, 2));
  console.log(`Exported ${projects.length} projects to ${outPath}`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
