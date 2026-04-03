import { renderToBuffer } from "@react-pdf/renderer";
import { CalendarPDF } from "@/lib/pdf/calendar-pdf";
import { RubricPDF } from "@/lib/pdf/rubric-pdf";
import { HandoutPDF } from "@/lib/pdf/handout-pdf";

export async function POST(request: Request) {
  try {
    const { type, data, project } = await request.json();

    if (!data || !project) {
      return Response.json(
        { error: "Missing data or project" },
        { status: 400 }
      );
    }

    let element;
    switch (type) {
      case "calendar":
        element = <CalendarPDF data={data} project={project} />;
        break;
      case "product-rubric":
      case "process-rubric":
        element = <RubricPDF data={data} project={project} />;
        break;
      default:
        element = <HandoutPDF data={data} type={type} project={project} />;
        break;
    }

    const buffer = await renderToBuffer(element as any);
    const uint8 = new Uint8Array(buffer);

    const filename = `${type}-${project.title?.replace(/\s+/g, "-") || "project"}.pdf`;

    return new Response(uint8, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return Response.json(
      { error: "PDF generation failed" },
      { status: 500 }
    );
  }
}
