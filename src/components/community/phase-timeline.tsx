"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhaseTimelineProps {
  phases: {
    entryEvent: {
      ideas: Array<{
        title: string;
        description: string;
        materials: string[];
        timeNeeded: string;
        type: string;
      }>;
      selectedIndex?: number;
      customNotes?: string;
    };
    investigation: {
      activities: Array<{
        title: string;
        description: string;
        duration: string;
        phase: number;
        type: string;
      }>;
      skills: string[];
      empathyExercises: string[];
      resources: Array<{
        title: string;
        url?: string;
        type: string;
        description: string;
      }>;
    };
    problemChallenge: {
      refinedDQ: string;
      needToKnow: string[];
      expertSuggestions: string[];
    };
    create: {
      prototypingIdeas: string[];
      critiqueProtocol: string;
      iterationPlan: string;
      materials: string[];
    };
    share: {
      audienceSuggestions: string[];
      presentationFormats: string[];
      reflectionPrompts: string[];
    };
  };
}

const phaseConfig = [
  { name: "Entry Event", color: "bg-brand-coral" },
  { name: "Investigation", color: "bg-indigo-500" },
  { name: "Problem/Design Challenge", color: "bg-brand-teal" },
  { name: "Create", color: "bg-amber-500" },
  { name: "Share", color: "bg-purple-500" },
] as const;

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-medium text-sm text-neutral-900 mb-1">{children}</h4>
  );
}

function EntryEventContent({
  data,
}: {
  data: PhaseTimelineProps["phases"]["entryEvent"];
}) {
  const idea = data.ideas[data.selectedIndex ?? 0];
  if (!idea) return null;

  return (
    <div className="space-y-3">
      <div>
        <SubLabel>Selected Idea</SubLabel>
        <p className="text-sm font-medium text-neutral-800">{idea.title}</p>
        <p className="text-sm text-neutral-700 mt-1">{idea.description}</p>
      </div>
      {idea.materials.length > 0 && (
        <div>
          <SubLabel>Materials</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {idea.materials.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-4 text-sm text-neutral-600">
        <span>Time: {idea.timeNeeded}</span>
        <span>Type: {idea.type}</span>
      </div>
      {data.customNotes && (
        <div>
          <SubLabel>Notes</SubLabel>
          <p className="text-sm text-neutral-700">{data.customNotes}</p>
        </div>
      )}
    </div>
  );
}

function InvestigationContent({
  data,
}: {
  data: PhaseTimelineProps["phases"]["investigation"];
}) {
  return (
    <div className="space-y-3">
      {data.activities.length > 0 && (
        <div>
          <SubLabel>Activities</SubLabel>
          <ul className="space-y-2">
            {data.activities.map((a, i) => (
              <li key={i} className="text-sm text-neutral-700">
                <span className="font-medium text-neutral-800">{a.title}</span>
                <span className="text-neutral-500 ml-2">({a.duration})</span>
                <p className="mt-0.5">{a.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data.skills.length > 0 && (
        <div>
          <SubLabel>Skills</SubLabel>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="text-xs bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
      {data.resources.length > 0 && (
        <div>
          <SubLabel>Resources</SubLabel>
          <ul className="space-y-1 text-sm text-neutral-700">
            {data.resources.map((r, i) => (
              <li key={i}>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    {r.title}
                  </a>
                ) : (
                  <span className="font-medium">{r.title}</span>
                )}
                {r.description && (
                  <span className="text-neutral-500"> — {r.description}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ProblemContent({
  data,
}: {
  data: PhaseTimelineProps["phases"]["problemChallenge"];
}) {
  return (
    <div className="space-y-3">
      <div>
        <SubLabel>Refined Driving Question</SubLabel>
        <p className="text-sm text-neutral-700 italic">&ldquo;{data.refinedDQ}&rdquo;</p>
      </div>
      {data.needToKnow.length > 0 && (
        <div>
          <SubLabel>Need to Know</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.needToKnow.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.expertSuggestions.length > 0 && (
        <div>
          <SubLabel>Expert Suggestions</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.expertSuggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CreateContent({
  data,
}: {
  data: PhaseTimelineProps["phases"]["create"];
}) {
  return (
    <div className="space-y-3">
      {data.prototypingIdeas.length > 0 && (
        <div>
          <SubLabel>Prototyping Ideas</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.prototypingIdeas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.critiqueProtocol && (
        <div>
          <SubLabel>Critique Protocol</SubLabel>
          <p className="text-sm text-neutral-700">{data.critiqueProtocol}</p>
        </div>
      )}
      {data.iterationPlan && (
        <div>
          <SubLabel>Iteration Plan</SubLabel>
          <p className="text-sm text-neutral-700">{data.iterationPlan}</p>
        </div>
      )}
      {data.materials.length > 0 && (
        <div>
          <SubLabel>Materials</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.materials.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ShareContent({
  data,
}: {
  data: PhaseTimelineProps["phases"]["share"];
}) {
  return (
    <div className="space-y-3">
      {data.audienceSuggestions.length > 0 && (
        <div>
          <SubLabel>Audience Suggestions</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.audienceSuggestions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.presentationFormats.length > 0 && (
        <div>
          <SubLabel>Presentation Formats</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.presentationFormats.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {data.reflectionPrompts.length > 0 && (
        <div>
          <SubLabel>Reflection Prompts</SubLabel>
          <ul className="list-disc list-inside text-sm text-neutral-700 space-y-0.5">
            {data.reflectionPrompts.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function PhaseTimeline({ phases }: PhaseTimelineProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const renderContent = (index: number) => {
    switch (index) {
      case 0:
        return <EntryEventContent data={phases.entryEvent} />;
      case 1:
        return <InvestigationContent data={phases.investigation} />;
      case 2:
        return <ProblemContent data={phases.problemChallenge} />;
      case 3:
        return <CreateContent data={phases.create} />;
      case 4:
        return <ShareContent data={phases.share} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-2">
      {phaseConfig.map((phase, index) => (
        <div
          key={index}
          className="rounded-lg border border-neutral-200 overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 transition-colors"
          >
            <span className={cn("size-3 rounded-full shrink-0", phase.color)} />
            <span className="text-sm font-medium text-neutral-900">
              Phase {index + 1}: {phase.name}
            </span>
            <ChevronDown
              className={cn(
                "ml-auto size-4 text-neutral-400 transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-1">{renderContent(index)}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
