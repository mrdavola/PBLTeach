import type { BuilderInput } from "@/lib/types/project";

export function buildLearningNarrativePrompt(
  input: BuilderInput & { drivingQuestion: string }
): string {
  return `Generate a complete Learning Narrative for a project-based learning unit.

Context:
- Grade Level: ${input.gradeLevel}
- Subject(s): ${input.subjects.join(", ")}
- Topic: ${input.topic}
- Duration: ${input.duration}
- Teacher Comfort Level: ${input.comfortLevel}
- Driving Question: ${input.drivingQuestion}
${input.standards ? `- Standards to Address: ${input.standards}` : ""}
${input.additionalNotes ? `- Additional Notes: ${input.additionalNotes}` : ""}

Generate all 5 phases of the Learning Narrative, plus assessment and cross-curricular connections.

Respond with valid JSON matching this exact schema:
{
  "phases": {
    "entryEvent": {
      "ideas": [
        {
          "title": "string",
          "description": "string (1-3 sentences)",
          "materials": ["string"],
          "timeNeeded": "string",
          "type": "video" | "guest" | "activity" | "field-trip" | "simulation" | "artifact" | "other"
        }
      ]
    },
    "investigation": {
      "activities": [
        {
          "title": "string",
          "description": "string (1-3 sentences)",
          "duration": "string",
          "phase": 2,
          "type": "research" | "skill-building" | "collaboration" | "reflection" | "creation"
        }
      ],
      "skills": ["string"],
      "empathyExercises": ["string"],
      "resources": [
        {
          "title": "string",
          "url": "string (optional)",
          "type": "article" | "video" | "tool" | "template" | "book",
          "description": "string"
        }
      ]
    },
    "problemChallenge": {
      "refinedDQ": "string",
      "needToKnow": ["string"],
      "expertSuggestions": ["string"]
    },
    "create": {
      "prototypingIdeas": ["string"],
      "critiqueProtocol": "string",
      "iterationPlan": "string",
      "materials": ["string"]
    },
    "share": {
      "audienceSuggestions": ["string"],
      "presentationFormats": ["string"],
      "reflectionPrompts": ["string"]
    }
  },
  "assessment": {
    "formative": [
      {
        "title": "string",
        "description": "string",
        "phase": 1-5,
        "type": "formative",
        "method": "rubric" | "self-assessment" | "peer-assessment" | "portfolio" | "presentation" | "journal" | "conference"
      }
    ],
    "summative": [
      {
        "title": "string",
        "description": "string",
        "phase": 1-5,
        "type": "summative",
        "method": "rubric" | "self-assessment" | "peer-assessment" | "portfolio" | "presentation" | "journal" | "conference"
      }
    ],
    "rubricType": "product" | "process" | "both"
  },
  "crossCurricular": {
    "connections": [
      {
        "subject": "string",
        "topic": "string",
        "connectionDescription": "string"
      }
    ],
    "standardsAligned": [
      {
        "code": "string",
        "description": "string",
        "subject": "string",
        "gradeLevel": "string"
      }
    ]
  },
  "goldStandard": {
    "elementsIncluded": [1, 2, 3, 4, 5, 6, 7],
    "score": 1-7
  }
}

The 7 Gold Standard PBL Essential Design Elements are:
1. Challenging Problem or Question
2. Sustained Inquiry
3. Authenticity
4. Student Voice & Choice
5. Reflection
6. Critique & Revision
7. Public Product

Ensure all suggestions are grade-appropriate for ${input.gradeLevel} and achievable within a ${input.duration} timeframe.`;
}
