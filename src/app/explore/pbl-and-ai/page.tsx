"use client";

import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { ModuleLayout } from "@/components/explore/module-layout";
import { AiRoleSorter } from "@/components/explore/ai-role-sorter";
import { PhilosophyTimeline } from "@/components/explore/philosophy-timeline";
import { Sparkles, BookOpen, UserPen } from "lucide-react";
import { cn } from "@/lib/utils";

const philosophyCards = [
  {
    title: "The frameworks",
    description:
      "Gold Standard, Learning Narrative, DQ Formula are human-curated by educators.",
    icon: BookOpen,
    color: "text-brand-coral",
    bg: "bg-brand-coral-light/40",
    border: "border-brand-coral/20",
  },
  {
    title: "The generation",
    description: "AI creates content within those structures.",
    icon: Sparkles,
    color: "text-brand-teal",
    bg: "bg-brand-teal-light/40",
    border: "border-brand-teal/20",
  },
  {
    title: "The decisions",
    description: "You review, edit, and adapt everything.",
    icon: UserPen,
    color: "text-brand-purple",
    bg: "bg-brand-purple-light/40",
    border: "border-brand-purple/20",
  },
];

const aiStrengths = [
  "Generating ideas quickly",
  "Creating first drafts",
  "Formatting content",
  "Finding connections",
];

const humanStrengths = [
  "Understanding your students",
  "Building relationships",
  "Making judgment calls",
  "Facilitating learning",
];

export default function PblAndAiPage() {
  return (
    <ModuleLayout
      title="PBL + AI"
      duration="5-7 min"
      learningGoal="Understand how AI supports but doesn't replace PBL design"
      progressColor="bg-brand-purple"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="text-center font-display text-2xl font-bold leading-snug text-neutral-900">
            AI can generate a lesson plan in seconds. But can it understand your
            students?
          </p>
          <p className="mt-3 text-center text-base text-neutral-500">
            That&apos;s the question.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: AI Role Sorter */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Who Should Do What?
          </h2>
        </ScrollReveal>
        <AiRoleSorter />
      </section>

      {/* Section 3: Philosophy Timeline */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            Start Human. Use AI. End Human.
          </h2>
        </ScrollReveal>
        <PhilosophyTimeline />
      </section>

      {/* Section 4: How PBLTeach uses this philosophy */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            How PBLTeach Uses This Philosophy
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-3">
          {philosophyCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <Card className={cn("h-full", card.border, card.bg)}>
                  <CardContent>
                    <Icon className={cn("mb-2 size-5", card.color)} />
                    <h3 className="mb-1 font-display text-sm font-bold text-neutral-900">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-600">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Section 5: AI vs Human strengths */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            What AI Is Good At vs. What Humans Are Good At
          </h2>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2">
          <ScrollReveal>
            <Card className="h-full border-brand-teal/20 bg-brand-teal-light/30">
              <CardContent>
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles className="size-4 text-brand-teal" />
                  <h3 className="font-display text-sm font-bold text-brand-teal-dark">
                    AI
                  </h3>
                </div>
                <ul className="space-y-2">
                  {aiStrengths.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-brand-teal" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="h-full border-brand-coral/20 bg-brand-coral-light/30">
              <CardContent>
                <div className="mb-3 flex items-center gap-2">
                  <UserPen className="size-4 text-brand-coral" />
                  <h3 className="font-display text-sm font-bold text-brand-coral">
                    Human
                  </h3>
                </div>
                <ul className="space-y-2">
                  {humanStrengths.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-brand-coral" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </ModuleLayout>
  );
}
