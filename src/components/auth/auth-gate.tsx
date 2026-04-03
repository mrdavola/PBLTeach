"use client";

import { useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { SignInModal } from "./sign-in-modal";
import { Button } from "@/components/ui/button";

interface AuthGateProps {
  message?: string;
  children: ReactNode;
}

export function AuthGate({
  message = "Want to save this? Sign in to keep your work.",
  children,
}: AuthGateProps) {
  const { isAuthenticated, loading } = useAuth();
  const [signInOpen, setSignInOpen] = useState(false);

  if (loading) return null;

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
      <p className="text-sm text-neutral-600">{message}</p>
      <Button variant="outline" size="sm" onClick={() => setSignInOpen(true)}>
        Sign in
      </Button>
      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
    </div>
  );
}
