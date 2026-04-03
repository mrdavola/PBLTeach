export function buildDQPrompt(input: {
  gradeLevel: string;
  subjects: string[];
  topic: string;
  duration: string;
  teacherNotes?: string;
}): string {
  return `Generate 3 driving questions for a project-based learning unit.

Context:
- Grade Level: ${input.gradeLevel}
- Subject(s): ${input.subjects.join(", ")}
- Topic: ${input.topic}
- Duration: ${input.duration}
${input.teacherNotes ? `- Teacher Notes: ${input.teacherNotes}` : ""}

Use the Driving Question Formula:
"How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"

Each driving question should:
1. Be authentic and meaningful to students at this grade level
2. Allow for multiple valid approaches and solutions
3. Connect to real-world issues or audiences
4. Be achievable within the given duration

Provide 3 options with varying difficulty levels (beginner-friendly, balanced, ambitious).

Respond with valid JSON matching this exact schema:
{
  "drivingQuestions": [
    {
      "question": "The full driving question as a string",
      "formula": {
        "role": "The role students take on",
        "action": "The verb/action they perform",
        "product": "What they create",
        "audience": "Who they create it for",
        "purpose": "Why it matters"
      },
      "whyItWorks": "1-2 sentence explanation of why this DQ is effective",
      "authenticityRating": "low" | "medium" | "high",
      "difficultyLevel": "beginner-friendly" | "balanced" | "ambitious"
    }
  ]
}`;
}
