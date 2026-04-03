"use client";

import { use } from "react";
import { AuthContext } from "@/components/providers/auth-provider";
import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOut,
} from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export function useAuth() {
  const context = use(AuthContext);

  return {
    ...context,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    isFirebaseConfigured,
  };
}
