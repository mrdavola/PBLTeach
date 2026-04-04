"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { PBLTeachLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SignInModal } from "@/components/auth/sign-in-modal";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const coreNavLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/build", label: "Build" },
  { href: "/analyze", label: "Analyze" },
  { href: "/community", label: "Community" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, signOut } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }
  }, [dropdownOpen]);

  const userLabel = user?.displayName || user?.email || "Account";

  async function handleSignOut() {
    setDropdownOpen(false);
    await signOut();
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-300">
        <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" aria-label="PBLTeach home">
            <PBLTeachLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {coreNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-brand-teal font-bold"
                    : "text-neutral-700 hover:text-brand-teal"
                )}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={cn(
                    "font-body font-medium transition-colors",
                    pathname === "/dashboard"
                      ? "text-brand-teal font-bold"
                      : "text-neutral-700 hover:text-brand-teal"
                  )}
                >
                  My Projects
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="gap-1"
                  >
                    <span className="max-w-[120px] truncate">{userLabel}</span>
                    <ChevronDown className="size-3.5" />
                  </Button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-1 w-48 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                      >
                        <LogOut className="size-4" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className={cn(
                    "font-body font-medium transition-colors",
                    pathname === "/about"
                      ? "text-brand-teal font-bold"
                      : "text-neutral-700 hover:text-brand-teal"
                  )}
                >
                  About
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSignInOpen(true)}
                >
                  Sign In
                </Button>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center h-11 w-11 text-neutral-700"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden">
            <div className="flex items-center justify-between h-16 px-6">
              <Link
                href="/"
                aria-label="PBLTeach home"
                onClick={() => setMobileOpen(false)}
              >
                <PBLTeachLogo />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex items-center justify-center h-11 w-11 text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col items-center gap-6 pt-12">
              {coreNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-body font-medium text-lg transition-colors",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-brand-teal font-bold"
                      : "text-neutral-700 hover:text-brand-teal"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex flex-col items-center gap-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-body font-medium text-lg transition-colors",
                      pathname === "/dashboard"
                        ? "text-brand-teal font-bold"
                        : "text-neutral-700 hover:text-brand-teal"
                    )}
                  >
                    My Projects
                  </Link>
                  <div className="flex flex-col items-center gap-2 pt-4 border-t border-neutral-200">
                    <span className="text-sm text-neutral-500">{userLabel}</span>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                    >
                      <LogOut className="size-4 mr-1" />
                      Sign out
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "font-body font-medium text-lg transition-colors",
                      pathname === "/about"
                        ? "text-brand-teal font-bold"
                        : "text-neutral-700 hover:text-brand-teal"
                    )}
                  >
                    About
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setMobileOpen(false);
                      setSignInOpen(true);
                    }}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <SignInModal open={signInOpen} onOpenChange={setSignInOpen} />
    </>
  );
}
