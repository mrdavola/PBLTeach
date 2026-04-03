export function buildParsePrompt(
  rawText: string,
  subject: string,
  gradeLevel: string
): string {
  return `Given this scope and sequence document for ${subject}, Grade ${gradeLevel}:

${rawText}

Extract the curriculum units. For each unit, identify:
- title: The unit/topic name
- topics: Key topics and concepts covered (array of strings)
- standards: Any standards codes mentioned (array of strings, empty if none found)
- estimatedWeeks: How many weeks this unit likely takes (number)
- weekRange: Approximate week numbers [start, end] based on position in the document

Return JSON:
{
  "units": [
    { "title": "...", "topics": ["..."], "standards": ["..."], "estimatedWeeks": 3, "weekRange": [1, 3] }
  ],
  "totalWeeks": 36
}

If week ranges aren't explicit, estimate based on unit count and a typical 36-week school year.`;
}
