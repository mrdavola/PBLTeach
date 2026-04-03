"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { PBLTeachLogo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/build", label: "Build" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-300">
      <div className="mx-auto max-w-[1200px] px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" aria-label="PBLTeach home">
          <PBLTeachLogo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-body font-medium transition-colors",
                pathname === link.href
                  ? "text-brand-teal font-bold"
                  : "text-neutral-700 hover:text-brand-teal"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-neutral-700"
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
              className="text-neutral-700"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col items-center gap-6 pt-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-body font-medium text-lg transition-colors",
                  pathname === link.href
                    ? "text-brand-teal font-bold"
                    : "text-neutral-700 hover:text-brand-teal"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="ghost" onClick={() => setMobileOpen(false)}>
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
