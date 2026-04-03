export { app, auth, db, isFirebaseConfigured } from "./config";
export {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
  onAuthChange,
} from "./auth";
export {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  saveProject,
  getProject,
  getUserProjects,
  deleteProject,
} from "./firestore";
