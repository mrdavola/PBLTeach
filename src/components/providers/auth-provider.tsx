"use client";

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { type User as FirebaseUser } from "firebase/auth";
import { onAuthChange } from "@/lib/firebase/auth";
import { createUserProfile } from "@/lib/firebase/firestore";

export interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      // Create Firestore profile on first sign-in
      if (firebaseUser) {
        try {
          await createUserProfile(firebaseUser.uid, {
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
            displayName: firebaseUser.displayName ?? "",
            photoURL: firebaseUser.photoURL ?? undefined,
          });
        } catch {
          // Firestore may not be configured -- fail silently
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext value={{ user, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext>
  );
}
