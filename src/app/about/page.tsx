import { ScrollReveal, AssembleGroup, AssembleItem } from "@/components/ui/motion";
import { Card, CardContent } from "@/components/ui/card";

function CompassIcon() {
  return (
    <svg
      className="size-10 text-brand-teal"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" opacity="0.15" stroke="none" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function HammerIcon() {
  return (
    <svg
      className="size-10 text-brand-coral"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15L22 10.64" />
      <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="size-10 text-brand-indigo"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <rect x="7" y="13" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.15" stroke="none" />
      <rect x="14" y="13" width="3" height="3" rx="0.5" fill="currentColor" opacity="0.15" stroke="none" />
    </svg>
  );
}

const steps = [
  {
    icon: <CompassIcon />,
    title: "Learn",
    description:
      "Explore interactive modules to understand PBL frameworks, principles, and best practices at your own pace.",
  },
  {
    icon: <HammerIcon />,
    title: "Build",
    description:
      "Generate a complete Learning Narrative with AI assistance -- from a driving question to a full project plan.",
  },
  {
    icon: <CalendarIcon />,
    title: "Guide",
    description:
      "Get day-by-day facilitation materials, rubrics, and handouts ready for your classroom.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-16 md:py-24">
      {/* Hero */}
      <ScrollReveal>
        <header className="mb-20 text-center">
          <h1 className="font-display text-4xl font-bold text-neutral-900 md:text-5xl">
            About PBLTeach
          </h1>
          <p className="mt-4 text-lg text-neutral-500 md:text-xl">
            A PBL co-pilot that meets teachers where they are.
          </p>
        </header>
      </ScrollReveal>

      {/* Section 1: The Problem */}
      <ScrollReveal>
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
            The Problem
          </h2>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              Teachers know that Project-Based Learning leads to deeper
              understanding, stronger engagement, and more meaningful student
              work. But getting started feels overwhelming.
            </p>
            <p>
              Where do I begin? How do I write a good driving question? What if
              the project goes off the rails? How do I fit this into my
              curriculum map? These barriers -- confusion, lack of a starting
              point, messiness anxiety, and curriculum pressure -- keep PBL
              out of reach for too many classrooms.
            </p>
            <p>
              PBLTeach was built to remove those barriers, one question at a
              time.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: How PBLTeach Works */}
      <ScrollReveal>
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-8 text-center">
            How PBLTeach Works
          </h2>
          <AssembleGroup className="grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <AssembleItem key={step.title}>
                <Card className="h-full text-center">
                  <CardContent className="flex flex-col items-center gap-3">
                    {step.icon}
                    <h3 className="font-display text-lg font-bold text-neutral-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-700 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </AssembleItem>
            ))}
          </AssembleGroup>
        </section>
      </ScrollReveal>

      {/* Section 3: Our Philosophy */}
      <ScrollReveal>
        <section className="mb-20">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4 text-center">
            Our Philosophy
          </h2>
          <p className="font-display text-xl font-bold text-brand-teal text-center mb-6">
            Start Human. Use AI. End Human.
          </p>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              PBLTeach is not an AI that replaces teacher judgment. The
              frameworks and structures inside PBLTeach are curated by
              experienced educators who understand how PBL works in real
              classrooms.
            </p>
            <p>
              AI fills in content within those structures -- generating driving
              question options, scaffolding activities, and assessment ideas.
              But the teacher always makes the final call: choosing, editing,
              and adapting every element to fit their students, their
              community, and their goals.
            </p>
            <p>
              The best technology disappears into the background. PBLTeach
              gives you a head start so you can focus on what matters most --
              your students.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Built by */}
      <ScrollReveal>
        <section className="text-center">
          <h2 className="font-display text-2xl font-bold text-neutral-900 mb-4">
            Built by
          </h2>
          <p className="text-lg font-medium text-neutral-900">
            Mike Davola
          </p>
          <p className="text-sm text-neutral-500 mt-1">
            K-12 Technology Staff Developer, Garden City Public Schools
          </p>
          {/* TODO: Mike to add full bio here */}
          <p className="mt-6 text-neutral-700 leading-relaxed max-w-[520px] mx-auto">
            Mike has spent years helping teachers bring Project-Based Learning
            into their classrooms. PBLTeach is the tool he wished existed when
            he started coaching educators through their first PBL units.
          </p>
          <p className="mt-8 font-display font-bold text-brand-teal text-lg">
            PBLTeach is free for all educators.
          </p>
        </section>
      </ScrollReveal>
    </main>
  );
}
