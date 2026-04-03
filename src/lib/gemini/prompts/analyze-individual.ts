export interface ParsedUnit {
  title: string;
  topics: string[];
  standards: string[];
  estimatedWeeks: number;
  weekRange: [number, number];
}

export function buildIndividualAnalysisPrompt(
  parsedUnits: ParsedUnit[],
  subject: string,
  gradeLevel: string
): string {
  return `Given these curriculum units for ${subject}, Grade ${gradeLevel}:

${JSON.stringify(parsedUnits, null, 2)}

For each unit (or combination of adjacent units), identify PBL opportunities. For each opportunity:
- unitTitles: Which unit(s) it connects to (array of strings)
- weekRange: When it could happen [start, end]
- suggestedDQ: A driving question using the formula "How can we, as [role], [action] a [product] for [audience] to [purpose]?"
- description: 1-2 sentences describing the project
- suggestedDuration: "micro" | "mini" | "full"
- feasibility: "easy" | "moderate" | "ambitious"
- goldStandardElements: Which of the 7 Gold Standard elements this naturally includes (array of numbers 1-7)
- pitch: One sentence a teacher could use to get excited about this project

Return JSON:
{
  "opportunities": [
    {
      "unitTitles": ["..."],
      "weekRange": [1, 3],
      "suggestedDQ": "How can we...",
      "description": "...",
      "suggestedDuration": "mini",
      "feasibility": "easy",
      "goldStandardElements": [1, 2, 5],
      "pitch": "..."
    }
  ]
}

Focus on opportunities with real-world connections, authentic audiences, and meaningful products. Prioritize feasibility -- suggest projects that work within the existing curriculum pacing.`;
}
