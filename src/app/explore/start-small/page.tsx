"use client";

import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ModuleLayout } from "@/components/explore/module-layout";
import { ScaleSlider } from "@/components/explore/scale-slider";

const singleDayIdeas = [
  {
    title: "Replace a test",
    description:
      "Instead of a unit test, have students teach the concept to someone else (peer, younger student, parent).",
    elements: ["Authenticity", "Student Voice & Choice"],
  },
  {
    title: "Need to Know wall",
    description:
      "Before starting a new unit, show a hook and have students generate questions. Use their questions to drive instruction.",
    elements: ["Driving Question", "Need to Know"],
  },
  {
    title: "Expert Zoom",
    description:
      "Invite a 15-minute virtual guest related to your current topic. Students prepare questions in advance.",
    elements: ["Authenticity", "Public Product"],
  },
  {
    title: "Real audience letter",
    description:
      "Students write a letter to a real person (principal, local official, author) about something they're learning.",
    elements: ["Authenticity", "Public Product"],
  },
  {
    title: "Choice board",
    description:
      "Replace one assignment with 3-4 product options. Students choose how to demonstrate their learning.",
    elements: ["Student Voice & Choice"],
  },
];

const microProjects = [
  {
    title: "Infographic Campaign",
    grade: "Gr 4-6",
    subjects: "Math/ELA",
    description:
      "Students create infographics to teach younger students about a math concept.",
  },
  {
    title: "Letter to a Decision-Maker",
    grade: "Gr 6-8",
    subjects: "ELA/Social Studies",
    description:
      "Students research a local issue and write persuasive letters to community leaders.",
  },
  {
    title: "Shark Tank Pitch",
    grade: "Gr 8-12",
    subjects: "Cross-curricular",
    description:
      "Teams develop and pitch solutions to a school or community problem.",
  },
];

const growthSteps = [
  { label: "Single-day", color: "bg-brand-teal", textColor: "text-brand-teal" },
  { label: "Micro", color: "bg-brand-indigo", textColor: "text-brand-indigo" },
  { label: "Mini", color: "bg-brand-amber", textColor: "text-brand-amber" },
  { label: "Full", color: "bg-brand-purple", textColor: "text-brand-purple" },
];

export default function StartSmallPage() {
  return (
    <ModuleLayout
      title="Start Small"
      duration="3-5 min"
      learningGoal="Feel permission to try PBL at any scale"
      progressColor="bg-brand-amber"
    >
      {/* Section 1: Hook */}
      <section>
        <ScrollReveal>
          <p className="mx-auto max-w-lg text-center font-display text-2xl font-bold text-neutral-900">
            You don&apos;t have to redesign your entire year. You can try PBL in
            a single class period.
          </p>
        </ScrollReveal>
      </section>

      {/* Section 2: Scale Slider */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            PBL at every scale
          </h2>
        </ScrollReveal>
        <ScrollReveal>
          <ScaleSlider />
        </ScrollReveal>
      </section>

      {/* Section 3: Single-Day Ideas */}
      <section>
        <ScrollReveal>
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-neutral-900">
            5 things you can try tomorrow
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {singleDayIdeas.map((idea, i) => (
            <ScrollReveal key={idea.title} delay={i * 0.08}>
              <Card className="h-full">
                <CardContent className="space-y-3">
                  <h3 className="font-display font-bold text-neutral-900">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{idea.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.elements.map((el) => (
                      <Badge key={el} variant="secondary" className="text-xs">
                        {el}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section 4: Micro-Project Gallery */}
      <section>
        <ScrollReveal>
          <h2 className="mb-2 text-center font-display text-2xl font-bold text-neutral-900">
            Ready for more? Try a micro-project
          </h2>
          <p className="mb-8 text-center text-sm text-neutral-500">
            3-5 days of focused, project-based learning
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {microProjects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.1}>
              <Card className="h-full border-brand-indigo/20 bg-brand-indigo-light/30">
                <CardContent className="space-y-3">
                  <h3 className="font-display font-bold text-neutral-900">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.grade}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {project.subjects}
                    </Badge>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Section 5: Growth Path */}
      <section>
        <ScrollReveal>
          <h2 className="mb-10 text-center font-display text-2xl font-bold text-neutral-900">
            Your growth path
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 md:gap-4">
            {growthSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex size-10 items-center justify-center rounded-full text-sm font-bold text-white md:size-12",
                      step.color
                    )}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium md:text-sm",
                      step.textColor
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {i < growthSteps.length - 1 && (
                  <ArrowRight className="size-4 text-neutral-400 md:size-5" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-600">
            You&apos;re building your PBL muscle. Start where you&apos;re
            comfortable.
          </p>
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
