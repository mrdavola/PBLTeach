export interface DocumentInput {
  subject: string;
  gradeLevel: string;
  units: Array<{
    title: string;
    topics: string[];
    standards: string[];
    estimatedWeeks: number;
    weekRange: [number, number];
  }>;
}

export function buildCrossCurricularPrompt(
  documents: DocumentInput[]
): string {
  return `Given these scope and sequence documents for multiple subjects:

${JSON.stringify(documents, null, 2)}

Find cross-curricular PBL opportunities where 2 or more subjects have related topics in overlapping or adjacent time periods.

For each opportunity:
- subjects: Array of subjects involved
- unitConnections: For each subject, which unit(s) connect and their topics. Array of { subject: string, unitTitle: string, topics: string[] }
- weekRange: Optimal timing [start, end] (when topics overlap)
- suggestedDQ: A driving question connecting the subjects
- description: 1-2 sentences
- feasibility: "easy" | "moderate" | "ambitious"
- pitch: One sentence to propose this to a colleague
- standardsAddressed: Standards from each subject that would be covered (array of strings)

Return JSON:
{
  "opportunities": [
    {
      "subjects": ["Math", "Science"],
      "unitConnections": [
        { "subject": "Math", "unitTitle": "Fractions", "topics": ["equivalent fractions"] },
        { "subject": "Science", "unitTitle": "Measurement", "topics": ["metric units"] }
      ],
      "weekRange": [4, 6],
      "suggestedDQ": "How can we...",
      "description": "...",
      "feasibility": "easy",
      "pitch": "...",
      "standardsAddressed": ["4.NF.1", "4-PS2-1"]
    }
  ],
  "summary": "Found N cross-curricular opportunities across these subjects."
}

Sort by feasibility (easiest first). Focus on natural connections, not forced ones.`;
}
