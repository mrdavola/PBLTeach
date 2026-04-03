import type {
  Activity,
  AssessmentItem,
  BuilderInput,
  EntryEventIdea,
  Project,
  Resource,
  Standard,
  SubjectConnection,
} from "@/lib/types";

export const BUILDER_DRAFT_STORAGE_KEY = "pblteach:builder-draft";

interface NarrativeShape {
  phases?: Partial<Project["phases"]>;
  assessment?: Project["assessment"];
  crossCurricular?: Project["crossCurricular"];
  goldStandard?: Project["goldStandard"];
}

export interface BuilderDraftState {
  currentStep: number;
  formData: BuilderInput | null;
  selectedDQ: string;
  narrativeData: NarrativeShape | null;
  savedProjectId?: string;
}

export interface PhaseContent {
  activities?: string[];
  resources?: string[];
  suggestions?: string[];
}

function formatResource(resource: Resource) {
  const parts = [resource.title];
  if (resource.description) parts.push(resource.description);
  return parts.join(": ");
}

function formatActivity(activity: Activity) {
  return `${activity.title} (${activity.type}, ${activity.duration}): ${activity.description}`;
}

function formatEntryIdea(idea: EntryEventIdea) {
  const materials =
    idea.materials.length > 0 ? ` Materials: ${idea.materials.join(", ")}.` : "";
  const timeNeeded = idea.timeNeeded
    ? ` Time needed: ${idea.timeNeeded}.`
    : "";
  return `${idea.title}: ${idea.description}.${materials}${timeNeeded}`.replace(
    /\.\./g,
    "."
  );
}

function asStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function asRecord(value: unknown) {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : null;
}

function mapObjects<T>(
  value: unknown,
  predicate: (item: unknown) => item is T,
  formatter: (item: T) => string
) {
  return Array.isArray(value) ? value.filter(predicate).map(formatter) : [];
}

function isEntryEventIdea(item: unknown): item is EntryEventIdea {
  const record = asRecord(item);
  return Boolean(
    record &&
      typeof record.title === "string" &&
      typeof record.description === "string" &&
      Array.isArray(record.materials) &&
      typeof record.timeNeeded === "string" &&
      typeof record.type === "string"
  );
}

function isActivity(item: unknown): item is Activity {
  const record = asRecord(item);
  return Boolean(
    record &&
      typeof record.title === "string" &&
      typeof record.description === "string" &&
      typeof record.duration === "string" &&
      typeof record.phase === "number" &&
      typeof record.type === "string"
  );
}

function isResource(item: unknown): item is Resource {
  const record = asRecord(item);
  return Boolean(
    record &&
      typeof record.title === "string" &&
      typeof record.description === "string" &&
      typeof record.type === "string"
  );
}

export function buildPhaseContentsFromNarrative(
  narrativeData: NarrativeShape | null | undefined
): Record<number, PhaseContent> | undefined {
  const phases = narrativeData?.phases;
  if (!phases) return undefined;

  const result: Record<number, PhaseContent> = {};

  const entryEvent = phases.entryEvent;
  if (entryEvent) {
    const activities = mapObjects(
      entryEvent.ideas,
      isEntryEventIdea,
      formatEntryIdea
    );
    result[1] = activities.length > 0 ? { activities } : {};
  }

  const investigation = phases.investigation;
  if (investigation) {
    const activities = mapObjects(
      investigation.activities,
      isActivity,
      formatActivity
    );
    const resources = [
      ...mapObjects(investigation.resources, isResource, formatResource),
      ...asStringArray(investigation.skills).map((skill) => `Skill focus: ${skill}`),
    ];
    const suggestions = asStringArray(investigation.empathyExercises).map(
      (exercise) => `Empathy exercise: ${exercise}`
    );
    result[2] = {
      activities: activities.length > 0 ? activities : undefined,
      resources: resources.length > 0 ? resources : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  const problemChallenge = phases.problemChallenge;
  if (problemChallenge) {
    const activities = [];
    if (problemChallenge.refinedDQ) {
      activities.push(
        `Refined driving question: ${problemChallenge.refinedDQ}`
      );
    }
    const resources = asStringArray(problemChallenge.needToKnow).map(
      (item) => `Need to know: ${item}`
    );
    const suggestions = asStringArray(problemChallenge.expertSuggestions).map(
      (item) => `Expert suggestion: ${item}`
    );
    result[3] = {
      activities: activities.length > 0 ? activities : undefined,
      resources: resources.length > 0 ? resources : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  const create = phases.create;
  if (create) {
    const activities = asStringArray(create.prototypingIdeas);
    const resources = asStringArray(create.materials);
    const suggestions = [
      ...(create.critiqueProtocol
        ? [`Critique protocol: ${create.critiqueProtocol}`]
        : []),
      ...(create.iterationPlan ? [`Iteration plan: ${create.iterationPlan}`] : []),
    ];
    result[4] = {
      activities: activities.length > 0 ? activities : undefined,
      resources: resources.length > 0 ? resources : undefined,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  const share = phases.share;
  if (share) {
    result[5] = {
      activities: asStringArray(share.presentationFormats),
      resources: asStringArray(share.audienceSuggestions),
      suggestions: asStringArray(share.reflectionPrompts),
    };
  }

  return Object.keys(result).length > 0 ? result : undefined;
}

export function buildPhaseContentsFromProject(
  project: Partial<Project> | null | undefined
) {
  return buildPhaseContentsFromNarrative({ phases: project?.phases });
}

function cleanAssessmentItems(value: unknown): AssessmentItem[] {
  return Array.isArray(value)
    ? value.filter((item): item is AssessmentItem => {
        const record = asRecord(item);
        return Boolean(
          record &&
            typeof record.title === "string" &&
            typeof record.description === "string" &&
            typeof record.phase === "number" &&
            typeof record.type === "string" &&
            typeof record.method === "string"
        );
      })
    : [];
}

function cleanConnections(value: unknown): SubjectConnection[] {
  return Array.isArray(value)
    ? value.filter((item): item is SubjectConnection => {
        const record = asRecord(item);
        return Boolean(
          record &&
            typeof record.subject === "string" &&
            typeof record.topic === "string" &&
            typeof record.connectionDescription === "string"
        );
      })
    : [];
}

function cleanStandards(value: unknown): Standard[] {
  return Array.isArray(value)
    ? value.filter((item): item is Standard => {
        const record = asRecord(item);
        return Boolean(
          record &&
            typeof record.code === "string" &&
            typeof record.description === "string" &&
            typeof record.subject === "string" &&
            typeof record.gradeLevel === "string"
        );
      })
    : [];
}

export function buildProjectDraft({
  formData,
  selectedDQ,
  narrativeData,
  projectId,
}: {
  formData: BuilderInput | null;
  selectedDQ: string;
  narrativeData: NarrativeShape | null;
  projectId?: string;
}): Partial<Project> {
  const phases = narrativeData?.phases;

  return {
    ...(projectId ? { id: projectId } : {}),
    status: "draft",
    title: formData?.topic ?? "Untitled Project",
    gradeLevel: formData?.gradeLevel ?? "",
    subjects: formData?.subjects ?? [],
    topic: formData?.topic ?? "",
    duration: formData?.duration ?? "mini",
    comfortLevel: formData?.comfortLevel ?? "new",
    drivingQuestion: {
      selected: selectedDQ,
      options: selectedDQ ? [selectedDQ] : [],
      formula: { role: "", action: "", product: "", audience: "", purpose: "" },
    },
    ...(phases ? { phases: phases as Project["phases"] } : {}),
    ...(narrativeData?.assessment
      ? {
          assessment: {
            formative: cleanAssessmentItems(narrativeData.assessment.formative),
            summative: cleanAssessmentItems(narrativeData.assessment.summative),
            rubricType: narrativeData.assessment.rubricType,
          },
        }
      : {}),
    ...(narrativeData?.crossCurricular
      ? {
          crossCurricular: {
            connections: cleanConnections(
              narrativeData.crossCurricular.connections
            ),
            standardsAligned: cleanStandards(
              narrativeData.crossCurricular.standardsAligned
            ),
          },
        }
      : {}),
    ...(narrativeData?.goldStandard
      ? { goldStandard: narrativeData.goldStandard }
      : {}),
  };
}

export function serializeBuilderDraft(state: BuilderDraftState) {
  return JSON.stringify(state);
}

export function parseBuilderDraft(serialized: string | null) {
  if (!serialized) return null;
  try {
    const parsed = JSON.parse(serialized) as BuilderDraftState;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function readLocalBuilderDraft(storage: Storage | null | undefined) {
  return parseBuilderDraft(storage?.getItem(BUILDER_DRAFT_STORAGE_KEY) ?? null);
}

export function writeLocalBuilderDraft(
  storage: Storage | null | undefined,
  state: BuilderDraftState
) {
  storage?.setItem(BUILDER_DRAFT_STORAGE_KEY, serializeBuilderDraft(state));
}

export function clearLocalBuilderDraft(storage: Storage | null | undefined) {
  storage?.removeItem(BUILDER_DRAFT_STORAGE_KEY);
}
