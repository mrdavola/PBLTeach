"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AssembleGroup, AssembleItem } from "@/components/ui/motion";

const quickStartPills = [
  { label: "Write a driving question", href: "/build" },
  { label: "Explore PBL 101", href: "/explore" },
  { label: "Browse community projects", href: "/explore" },
] as const;

function WorkshopIllustration() {
  return (
    <svg
      viewBox="0 0 320 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-full max-w-[320px]"
      aria-hidden="true"
    >
      {/* Table */}
      <path
        d="M60 140 C58 139, 262 139, 260 140 L268 142 C270 143, 50 143, 52 142 Z"
        fill="#E0F2F1"
        stroke="#0D7377"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Table legs */}
      <path
        d="M80 142 L76 180"
        stroke="#0D7377"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M240 142 L244 180"
        stroke="#0D7377"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pencil 1 */}
      <path
        d="M110 120 L114 136"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M114 136 L114.5 140"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pencil 2 */}
      <path
        d="M130 118 L128 136"
        stroke="#E8634A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M128 136 L127.5 140"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Pencil cup */}
      <path
        d="M102 124 C100 124, 100 140, 102 140 L138 140 C140 140, 140 124, 138 124 Z"
        fill="none"
        stroke="#0D7377"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0"
      />

      {/* Paper / notebook */}
      <path
        d="M170 118 C169 117, 221 117, 220 118 L222 140 C223 141, 167 141, 168 140 Z"
        fill="white"
        stroke="#D1D5DB"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Notebook lines */}
      <line x1="176" y1="125" x2="214" y2="125" stroke="#D1D5DB" strokeWidth="0.8" />
      <line x1="176" y1="130" x2="210" y2="130" stroke="#D1D5DB" strokeWidth="0.8" />
      <line x1="176" y1="135" x2="206" y2="135" stroke="#D1D5DB" strokeWidth="0.8" />

      {/* Lightbulb outline */}
      <g transform="translate(160, 40)">
        <path
          d="M0 40 C-2 32, -12 26, -12 16 C-12 4, -4 -4, 0 -6 C4 -4, 12 4, 12 16 C12 26, 2 32, 0 40 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 3"
        />
        {/* Filament */}
        <path
          d="M-4 20 C-2 16, 2 24, 4 20"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Base */}
        <line x1="-5" y1="42" x2="5" y2="42" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="-4" y1="45" x2="4" y2="45" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
        {/* Rays */}
        <line x1="0" y1="-14" x2="0" y2="-20" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="16" y1="4" x2="22" y2="2" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="-16" y1="4" x2="-22" y2="2" stroke="#D97706" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* Small star / sparkle */}
      <path
        d="M80 60 L82 54 L84 60 L90 62 L84 64 L82 70 L80 64 L74 62 Z"
        fill="none"
        stroke="#7C3AED"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.4"
      />

      {/* Another small sparkle */}
      <path
        d="M240 50 L241 46 L242 50 L246 51 L242 52 L241 56 L240 52 L236 51 Z"
        fill="none"
        stroke="#0D7377"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function EmptyDashboard() {
  const router = useRouter();
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (!description.trim()) return;
    const encoded = encodeURIComponent(description.trim());
    router.push(`/build?description=${encoded}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <AssembleGroup className="flex flex-col items-center gap-8">
      <AssembleItem>
        <WorkshopIllustration />
      </AssembleItem>

      <AssembleItem>
        <h1 className="font-display text-3xl font-bold text-center text-neutral-900">
          Every great project starts with a question.
        </h1>
      </AssembleItem>

      <AssembleItem className="w-full max-w-[600px]">
        <div className="flex flex-col gap-3">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What are you teaching next? Describe your topic, grade, and subject..."
            className="min-h-[120px] text-base"
          />
          <Button
            onClick={handleSubmit}
            disabled={!description.trim()}
            size="lg"
            className="self-end"
          >
            Start Building
          </Button>
        </div>
      </AssembleItem>

      <AssembleItem>
        <div className="flex flex-wrap justify-center gap-2">
          {quickStartPills.map((pill) => (
            <Badge
              key={pill.label}
              variant="secondary"
              render={<a href={pill.href} />}
              className="cursor-pointer px-4 py-1.5 text-sm transition-colors hover:bg-brand-teal-light"
            >
              {pill.label}
            </Badge>
          ))}
        </div>
      </AssembleItem>
    </AssembleGroup>
  );
}
