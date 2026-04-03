import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./config";

const storage = app ? getStorage(app) : null;

export async function uploadDocument(
  userId: string,
  file: File
): Promise<string | null> {
  if (!storage) return null;
  const storageRef = ref(
    storage,
    `users/${userId}/uploads/${Date.now()}-${file.name}`
  );
  const buffer = await file.arrayBuffer();
  await uploadBytes(storageRef, new Uint8Array(buffer));
  return getDownloadURL(storageRef);
}

export async function deleteDocument(path: string): Promise<void> {
  if (!storage) return;
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
}
