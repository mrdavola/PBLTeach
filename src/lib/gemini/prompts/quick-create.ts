export function buildQuickCreatePrompt(description: string): string {
  return `A teacher has provided this freeform description of a project idea:

"${description}"

Based on this description, generate a Quick Create result that includes:
1. A well-crafted driving question using the formula: "How can we, as [ROLE], [ACTION] a [PRODUCT] for [AUDIENCE] to [PURPOSE]?"
2. A one-liner overview for each of the 5 Learning Narrative phases
3. A "Start Small" suggestion (a simplified version that could be done in a single class period)
4. A suggested duration

Respond with valid JSON matching this exact schema:
{
  "drivingQuestion": "The full driving question as a string",
  "formula": {
    "role": "The role students take on",
    "action": "The verb/action they perform",
    "product": "What they create",
    "audience": "Who they create it for",
    "purpose": "Why it matters"
  },
  "phaseOverview": {
    "entryEvent": "One sentence describing the entry event",
    "investigation": "One sentence describing the investigation phase",
    "problemChallenge": "One sentence describing the problem/design challenge",
    "create": "One sentence describing the create phase",
    "share": "One sentence describing the share phase"
  },
  "startSmallSuggestion": "A concrete suggestion for a single-class-period version of this project",
  "suggestedDuration": "single-day" | "micro" | "mini" | "full"
}`;
}
