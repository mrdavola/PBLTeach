export function buildFacilitationCalendarPrompt(
  project: any,
  options: { classMinutes: number; classesPerWeek: number }
): string {
  return `Generate a day-by-day facilitation calendar for the following PBL project.

PROJECT DATA:
- Title: ${project.title}
- Grade Level: ${project.gradeLevel}
- Subjects: ${Array.isArray(project.subjects) ? project.subjects.join(", ") : project.subjects}
- Duration: ${project.duration}${project.durationWeeks ? ` (${project.durationWeeks} weeks)` : ""}
- Driving Question: ${project.drivingQuestion?.selected || "N/A"}

PHASES:
Phase 1 - Entry Event: ${JSON.stringify(project.phases?.entryEvent || {})}
Phase 2 - Investigation: ${JSON.stringify(project.phases?.investigation || {})}
Phase 3 - Problem/Design Challenge: ${JSON.stringify(project.phases?.problemChallenge || {})}
Phase 4 - Create: ${JSON.stringify(project.phases?.create || {})}
Phase 5 - Share: ${JSON.stringify(project.phases?.share || {})}

SCHEDULE CONSTRAINTS:
- Class period length: ${options.classMinutes} minutes
- Classes per week: ${options.classesPerWeek}

INSTRUCTIONS:
- Create a natural progression through all 5 phases. Do NOT front-load all instruction in week 1.
- Include at least 2 reflection moments spread across the project.
- Include at least 1 critique/revision cycle in Phase 4.
- Final days should cover presentation and reflection.
- Each session title should be 5 words max.
- Opening prompts should be conversational -- what the teacher actually says out loud.
- Time breakdowns for each day must sum to ${options.classMinutes} minutes.

Return a JSON array where each element has this shape:
{
  "dayNumber": number,
  "weekNumber": number,
  "phase": 1 | 2 | 3 | 4 | 5,
  "sessionTitle": "5 words max",
  "openingPrompt": "1-2 sentences, conversational, what the teacher says out loud",
  "activities": ["2-3 bullet points describing student activities"],
  "teacherMoves": ["1-2 key teacher actions"],
  "closing": "1 sentence closing activity or exit ticket",
  "materialsNeeded": ["list of materials"],
  "timeBreakdown": [{ "activity": "name", "minutes": number }]
}`;
}
