export type HandoutType =
  | "student-brief"
  | "reflection-journal"
  | "critique-protocol"
  | "parent-letter"
  | "milestone-tracker";

export function buildHandoutPrompt(project: any, type: HandoutType): string {
  const projectContext = `
PROJECT DATA:
- Title: ${project.title}
- Grade Level: ${project.gradeLevel}
- Subjects: ${Array.isArray(project.subjects) ? project.subjects.join(", ") : project.subjects}
- Driving Question: ${project.drivingQuestion?.selected || "N/A"}
- Duration: ${project.duration}${project.durationWeeks ? ` (${project.durationWeeks} weeks)` : ""}
- Product: ${project.drivingQuestion?.formula?.product || "N/A"}
- Audience: ${project.drivingQuestion?.formula?.audience || "N/A"}
- Purpose: ${project.drivingQuestion?.formula?.purpose || "N/A"}

PHASES:
Phase 1 - Entry Event: ${JSON.stringify(project.phases?.entryEvent || {})}
Phase 2 - Investigation: ${JSON.stringify(project.phases?.investigation || {})}
Phase 3 - Problem/Design Challenge: ${JSON.stringify(project.phases?.problemChallenge || {})}
Phase 4 - Create: ${JSON.stringify(project.phases?.create || {})}
Phase 5 - Share: ${JSON.stringify(project.phases?.share || {})}`;

  switch (type) {
    case "student-brief":
      return `Generate a student project brief handout for the following PBL project.

${projectContext}

INSTRUCTIONS:
- Write in student-friendly language appropriate for ${project.gradeLevel}.
- The overview should be 2-3 sentences that get students excited.
- Expectations should be clear and actionable.
- Timeline should be high-level phase descriptions.
- Team roles should be relevant to this specific project.

Return JSON in this shape:
{
  "title": "Project title",
  "drivingQuestion": "The driving question",
  "overview": "2-3 sentence overview",
  "expectations": ["list of 4-6 clear expectations"],
  "timeline": ["Phase 1: ...", "Phase 2: ...", etc.],
  "teamRoles": ["Role 1: brief description", "Role 2: brief description", etc.]
}`;

    case "reflection-journal":
      return `Generate reflection journal prompts for each phase of the following PBL project.

${projectContext}

INSTRUCTIONS:
- Create 3-4 reflection prompts per phase.
- Prompts should encourage metacognition, self-assessment, and growth mindset.
- Use age-appropriate language for ${project.gradeLevel}.
- Prompts should be specific to what happens in each phase, not generic.

Return JSON in this shape:
{
  "phases": [
    {
      "phaseNumber": 1,
      "phaseName": "Entry Event",
      "prompts": ["Reflection prompt 1", "Reflection prompt 2", "Reflection prompt 3"]
    },
    {
      "phaseNumber": 2,
      "phaseName": "Investigation",
      "prompts": ["..."]
    },
    {
      "phaseNumber": 3,
      "phaseName": "Problem/Design Challenge",
      "prompts": ["..."]
    },
    {
      "phaseNumber": 4,
      "phaseName": "Create",
      "prompts": ["..."]
    },
    {
      "phaseNumber": 5,
      "phaseName": "Share",
      "prompts": ["..."]
    }
  ]
}`;

    case "critique-protocol":
      return `Generate a structured critique protocol handout for the following PBL project.

${projectContext}

INSTRUCTIONS:
- Create a step-by-step protocol students can follow during peer critique sessions.
- Include sentence starters to scaffold respectful, constructive feedback.
- Make it specific to the type of product students are creating.
- Keep language appropriate for ${project.gradeLevel}.

Return JSON in this shape:
{
  "title": "Critique protocol title",
  "steps": [
    {
      "stepNumber": 1,
      "instruction": "What to do in this step",
      "sentenceStarters": ["I notice that...", "One strength is..."]
    },
    {
      "stepNumber": 2,
      "instruction": "What to do in this step",
      "sentenceStarters": ["I wonder if...", "Have you considered..."]
    }
  ]
}`;

    case "parent-letter":
      return `Generate a parent/guardian letter for the following PBL project.

${projectContext}

INSTRUCTIONS:
- Write in a warm, professional tone appropriate for families of ${project.gradeLevel} students.
- Briefly explain what PBL is (1-2 sentences).
- Describe this specific project and its timeline.
- Provide concrete ways parents/guardians can support learning at home.
- Keep the letter concise -- parents are busy.

Return JSON in this shape:
{
  "greeting": "Dear Families,",
  "whatIsPBL": "1-2 sentence explanation of project-based learning",
  "projectDescription": "2-3 sentences about this specific project",
  "timeline": "Brief timeline overview",
  "howToSupport": ["4-6 specific ways to support at home"],
  "closing": "Warm closing sentence"
}`;

    case "milestone-tracker":
      return `Generate a milestone tracker for the following PBL project.

${projectContext}

INSTRUCTIONS:
- Create milestones that map to the project phases and timeline.
- Each milestone should have a clear, checkable deliverable.
- Include milestones for key checkpoints: research complete, first draft, critique, revision, final product, presentation.
- Keep it concise and actionable.

Return JSON in this shape:
{
  "projectTitle": "Project title",
  "milestones": [
    {
      "week": 1,
      "phase": 1,
      "milestone": "Name of milestone",
      "deliverable": "What students turn in or show"
    }
  ]
}`;
  }
}
