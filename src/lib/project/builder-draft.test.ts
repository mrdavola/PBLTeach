import test from "node:test";
import assert from "node:assert/strict";

import {
  buildPhaseContentsFromNarrative,
  buildProjectDraft,
  serializeBuilderDraft,
  parseBuilderDraft,
} from "./builder-draft.ts";

test("buildPhaseContentsFromNarrative flattens rich phase objects into readable strings", () => {
  const phaseContents = buildPhaseContentsFromNarrative({
    phases: {
      entryEvent: {
        ideas: [
          {
            title: "Museum mystery box",
            description: "Students inspect a sealed artifact crate.",
            materials: ["crate", "photos"],
            timeNeeded: "30 minutes",
            type: "artifact",
          },
        ],
      },
      investigation: {
        activities: [
          {
            title: "Measure real displays",
            description: "Students collect dimensions from examples.",
            duration: "45 minutes",
            phase: 2,
            type: "research",
          },
        ],
        skills: ["Measure perimeter accurately"],
        empathyExercises: ["Interview a museum visitor"],
        resources: [
          {
            title: "Display case article",
            description: "Background on conservation-friendly displays.",
            type: "article",
          },
        ],
      },
      problemChallenge: {
        refinedDQ: "How can we protect artifacts while teaching visitors?",
        needToKnow: ["What damages artifacts?"],
        expertSuggestions: ["Talk with a curator"],
      },
      create: {
        prototypingIdeas: ["Cardboard case mockup"],
        critiqueProtocol: "Gallery walk critique",
        iterationPlan: "Revise after peer feedback",
        materials: ["cardboard", "ruler"],
      },
      share: {
        audienceSuggestions: ["Local museum staff"],
        presentationFormats: ["Exhibit pitch"],
        reflectionPrompts: ["How did your design improve?"],
      },
    },
  });

  assert.deepEqual(phaseContents?.[1]?.activities, [
    "Museum mystery box: Students inspect a sealed artifact crate. Materials: crate, photos. Time needed: 30 minutes.",
  ]);
  assert.deepEqual(phaseContents?.[2]?.activities, [
    "Measure real displays (research, 45 minutes): Students collect dimensions from examples.",
  ]);
  assert.deepEqual(phaseContents?.[2]?.resources, [
    "Display case article: Background on conservation-friendly displays.",
    "Skill focus: Measure perimeter accurately",
  ]);
  assert.deepEqual(phaseContents?.[2]?.suggestions, [
    "Empathy exercise: Interview a museum visitor",
  ]);
  assert.deepEqual(phaseContents?.[3]?.activities, [
    "Refined driving question: How can we protect artifacts while teaching visitors?",
  ]);
});

test("buildProjectDraft carries narrative phases into a draft project payload", () => {
  const project = buildProjectDraft({
    formData: {
      gradeLevel: "4th Grade",
      subjects: ["Math", "Science"],
      topic: "Artifacts",
      duration: "mini",
      comfortLevel: "tried",
    },
    selectedDQ: "How can we design a case for a museum artifact?",
    narrativeData: {
      phases: {
        create: {
          prototypingIdeas: ["Prototype with cardboard"],
          critiqueProtocol: "Peer feedback circle",
          iterationPlan: "Improve after testing",
          materials: ["cardboard"],
        },
      },
      assessment: {
        formative: [],
        summative: [],
        rubricType: "both",
      },
      crossCurricular: {
        connections: [],
        standardsAligned: [],
      },
      goldStandard: {
        elementsIncluded: [1, 2, 3],
        score: 3,
      },
    },
  });

  assert.equal(project.status, "draft");
  assert.equal(project.title, "Artifacts");
  assert.equal(
    project.drivingQuestion?.selected,
    "How can we design a case for a museum artifact?"
  );
  assert.deepEqual(project.phases?.create.materials, ["cardboard"]);
});

test("serializeBuilderDraft and parseBuilderDraft round-trip state safely", () => {
  const serialized = serializeBuilderDraft({
    currentStep: 2,
    selectedDQ: "DQ",
    formData: {
      gradeLevel: "5th Grade",
      subjects: ["ELA"],
      topic: "Weather",
      duration: "micro",
      comfortLevel: "new",
    },
    narrativeData: null,
    savedProjectId: "abc123",
  });

  const parsed = parseBuilderDraft(serialized);

  assert.equal(parsed?.currentStep, 2);
  assert.equal(parsed?.selectedDQ, "DQ");
  assert.equal(parsed?.savedProjectId, "abc123");
  assert.equal(parsed?.formData?.topic, "Weather");
});
