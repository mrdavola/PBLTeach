export function buildRubricPrompt(
  project: any,
  type: "product" | "process"
): string {
  const projectContext = `
PROJECT DATA:
- Title: ${project.title}
- Grade Level: ${project.gradeLevel}
- Subjects: ${Array.isArray(project.subjects) ? project.subjects.join(", ") : project.subjects}
- Driving Question: ${project.drivingQuestion?.selected || "N/A"}
- Product: ${project.drivingQuestion?.formula?.product || "N/A"}
- Duration: ${project.duration}`;

  if (type === "product") {
    return `Generate a product rubric for the following PBL project.

${projectContext}

PHASES:
- Create phase: ${JSON.stringify(project.phases?.create || {})}
- Share phase: ${JSON.stringify(project.phases?.share || {})}

INSTRUCTIONS:
- Create 4-5 criteria that are specific and relevant to this project's product (${project.drivingQuestion?.formula?.product || "final deliverable"}).
- Each criterion should have 4 performance levels: Beginning, Developing, Proficient, Exemplary.
- Descriptions should be concise, observable, and grade-appropriate for ${project.gradeLevel}.
- Use student-friendly language.

Return JSON in this shape:
{
  "title": "Rubric title",
  "type": "product",
  "criteria": [
    {
      "criterion": "Name of criterion",
      "levels": {
        "beginning": "Description of beginning performance",
        "developing": "Description of developing performance",
        "proficient": "Description of proficient performance",
        "exemplary": "Description of exemplary performance"
      }
    }
  ]
}`;
  }

  return `Generate a process rubric for the following PBL project.

${projectContext}

INSTRUCTIONS:
- Use these 4 criteria: Collaboration, Inquiry/Research, Reflection, Time Management.
- Each criterion should have 4 performance levels: Beginning, Developing, Proficient, Exemplary.
- Descriptions should be concise, observable, and grade-appropriate for ${project.gradeLevel}.
- Use student-friendly language.

Return JSON in this shape:
{
  "title": "Rubric title",
  "type": "process",
  "criteria": [
    {
      "criterion": "Name of criterion",
      "levels": {
        "beginning": "Description of beginning performance",
        "developing": "Description of developing performance",
        "proficient": "Description of proficient performance",
        "exemplary": "Description of exemplary performance"
      }
    }
  ]
}`;
}
