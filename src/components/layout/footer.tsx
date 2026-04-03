import Link from "next/link";
import { PBLTeachLogoSmall } from "@/components/icons";

const footerLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/build", label: "Build" },
  { href: "/analyze", label: "Analyze" },
  { href: "/about", label: "About" },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-300">
      <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <PBLTeachLogoSmall />
          <p className="text-neutral-500 text-sm">
            Built for teachers, by teachers.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-500 hover:text-brand-teal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-sm text-neutral-400">
            2026 PBLTeach
          </span>
        </div>
      </div>
    </footer>
  );
}
