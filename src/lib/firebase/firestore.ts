import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
  where,
  limit,
  increment,
} from "firebase/firestore";
import type { User, Project, CommunityProject } from "@/lib/types";

function normalizeFirestoreDates<
  T extends Record<string, unknown> & {
    createdAt?: unknown;
    updatedAt?: unknown;
    published?: unknown;
  },
>(data: T) {
  // Normalize published.publishedAt for community projects
  const published = data.published as Record<string, unknown> | undefined;
  const normalizedPublished =
    published && published.publishedAt instanceof Timestamp
      ? { published: { ...published, publishedAt: published.publishedAt.toDate() } }
      : {};

  return {
    ...data,
    ...normalizedPublished,
    ...(data.createdAt instanceof Timestamp
      ? { createdAt: data.createdAt.toDate() }
      : {}),
    ...(data.updatedAt instanceof Timestamp
      ? { updatedAt: data.updatedAt.toDate() }
      : {}),
  };
}

// User operations
export async function createUserProfile(
  userId: string,
  data: Partial<User>
) {
  if (!db) throw new Error("Firebase not configured");
  const ref = doc(db, "users", userId);
  await setDoc(
    ref,
    { ...data, createdAt: serverTimestamp(), lastActiveAt: serverTimestamp() },
    { merge: true }
  );
}

export async function getUserProfile(
  userId: string
): Promise<User | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? (snap.data() as User) : null;
}

export async function updateUserProfile(
  userId: string,
  data: Partial<User>
) {
  if (!db) throw new Error("Firebase not configured");
  await updateDoc(doc(db, "users", userId), {
    ...data,
    lastActiveAt: serverTimestamp(),
  });
}

// Project operations
export async function saveProject(
  userId: string,
  project: Partial<Project>
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const projectsRef = collection(db, "users", userId, "projects");
  const projectId = project.id || doc(projectsRef).id;
  const ref = doc(projectsRef, projectId);
  await setDoc(
    ref,
    {
      ...project,
      id: projectId,
      userId,
      updatedAt: serverTimestamp(),
      ...(project.id ? {} : { createdAt: serverTimestamp() }),
    },
    { merge: true }
  );
  return projectId;
}

export async function getProject(
  userId: string,
  projectId: string
): Promise<Project | null> {
  if (!db) return null;
  const snap = await getDoc(
    doc(db, "users", userId, "projects", projectId)
  );
  return snap.exists()
    ? (normalizeFirestoreDates({ id: snap.id, ...snap.data() }) as Project)
    : null;
}

export async function getUserProjects(
  userId: string
): Promise<Project[]> {
  if (!db) return [];
  const q = query(
    collection(db, "users", userId, "projects"),
    orderBy("updatedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => normalizeFirestoreDates({ id: d.id, ...d.data() }) as Project
  );
}

export async function deleteProject(userId: string, projectId: string) {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, "users", userId, "projects", projectId));
}

// Scope sequence operations
export async function saveScopeSequence(
  userId: string,
  data: Record<string, unknown>
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const colRef = collection(db, "users", userId, "scopeSequences");
  const docId = doc(colRef).id;
  const ref = doc(colRef, docId);
  await setDoc(ref, { ...data, id: docId, uploadedAt: serverTimestamp() });
  return docId;
}

export async function getUserScopeSequences(
  userId: string
): Promise<Record<string, unknown>[]> {
  if (!db) return [];
  const q = query(
    collection(db, "users", userId, "scopeSequences"),
    orderBy("uploadedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deleteScopeSequence(
  userId: string,
  docId: string
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, "users", userId, "scopeSequences", docId));
}

// Community operations
export async function publishProject(
  userId: string,
  projectId: string,
  authorName: string,
  authorSchool?: string
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");

  // Guard against re-publishing (would reset ratings)
  const existingCommunity = await getDoc(doc(db, "community", projectId));
  if (existingCommunity.exists()) {
    throw new Error("This project has already been published");
  }

  const projectSnap = await getDoc(doc(db, "users", userId, "projects", projectId));
  if (!projectSnap.exists()) throw new Error("Project not found");
  const projectData = projectSnap.data();
  const communityRef = doc(db, "community", projectId);
  await setDoc(communityRef, {
    ...projectData,
    id: projectId,
    userId,
    status: "published",
    published: {
      publishedAt: serverTimestamp(),
      authorName,
      authorSchool: authorSchool || null,
      featured: false,
      hidden: false,
      ratingSum: 0,
      ratingCount: 0,
      adaptationCount: 0,
    },
  });
  await updateDoc(doc(db, "users", userId, "projects", projectId), {
    status: "published",
  });
}

export async function getCommunityProjects(
  filters?: {
    subject?: string;
    gradeLevel?: string;
    duration?: string;
    featured?: boolean;
  },
  maxResults = 50
): Promise<CommunityProject[]> {
  if (!db) return [];
  const constraints: any[] = [where("published.hidden", "==", false)];
  if (filters?.featured) constraints.push(where("published.featured", "==", true));
  if (filters?.subject) constraints.push(where("subjects", "array-contains", filters.subject));
  if (filters?.gradeLevel) constraints.push(where("gradeLevel", "==", filters.gradeLevel));
  if (filters?.duration) constraints.push(where("duration", "==", filters.duration));
  constraints.push(orderBy("published.publishedAt", "desc"));
  constraints.push(limit(maxResults));
  const q = query(collection(db, "community"), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => normalizeFirestoreDates({ id: d.id, ...d.data() }) as CommunityProject
  );
}

export async function getCommunityProject(
  projectId: string
): Promise<CommunityProject | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "community", projectId));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (data.published?.hidden) return null;
  return normalizeFirestoreDates({ id: snap.id, ...data }) as CommunityProject;
}

export async function rateCommunityProject(
  projectId: string,
  userId: string,
  score: number
): Promise<void> {
  if (!db) throw new Error("Firebase not configured");
  if (score < 1 || score > 5 || !Number.isInteger(score)) {
    throw new Error("Rating must be an integer between 1 and 5");
  }
  const ratingRef = doc(db, "community", projectId, "ratings", userId);
  const existingSnap = await getDoc(ratingRef);
  const communityRef = doc(db, "community", projectId);
  if (existingSnap.exists()) {
    const oldScore = existingSnap.data().score as number;
    await setDoc(ratingRef, { score, createdAt: serverTimestamp() });
    await updateDoc(communityRef, {
      "published.ratingSum": increment(score - oldScore),
    });
  } else {
    await setDoc(ratingRef, { score, createdAt: serverTimestamp() });
    await updateDoc(communityRef, {
      "published.ratingSum": increment(score),
      "published.ratingCount": increment(1),
    });
  }
}

export async function getUserRating(
  projectId: string,
  userId: string
): Promise<number | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "community", projectId, "ratings", userId));
  return snap.exists() ? (snap.data().score as number) : null;
}

export async function adaptCommunityProject(
  projectId: string,
  userId: string
): Promise<string> {
  if (!db) throw new Error("Firebase not configured");
  const communitySnap = await getDoc(doc(db, "community", projectId));
  if (!communitySnap.exists()) throw new Error("Project not found");
  const data = communitySnap.data();
  const projectsRef = collection(db, "users", userId, "projects");
  const newId = doc(projectsRef).id;
  const newRef = doc(projectsRef, newId);
  const { published, ...projectData } = data;
  await setDoc(newRef, {
    ...projectData,
    id: newId,
    userId,
    status: "draft",
    title: `${data.title} (adapted)`,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "community", projectId), {
    "published.adaptationCount": increment(1),
  });
  return newId;
}

export async function getMyPublishedProjects(
  userId: string
): Promise<CommunityProject[]> {
  if (!db) return [];
  const q = query(
    collection(db, "community"),
    where("userId", "==", userId),
    orderBy("published.publishedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) => normalizeFirestoreDates({ id: d.id, ...d.data() }) as CommunityProject
  );
}
