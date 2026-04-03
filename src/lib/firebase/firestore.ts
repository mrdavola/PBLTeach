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
} from "firebase/firestore";
import type { User, Project } from "@/lib/types";

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
    ? ({ id: snap.id, ...snap.data() } as Project)
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
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Project);
}

export async function deleteProject(userId: string, projectId: string) {
  if (!db) throw new Error("Firebase not configured");
  await deleteDoc(doc(db, "users", userId, "projects", projectId));
}
