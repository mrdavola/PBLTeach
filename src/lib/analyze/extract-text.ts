import { extractTextFromPDF } from "./parse-pdf";
import { extractTextFromDOCX } from "./parse-docx";

export async function extractText(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const ext = filename.toLowerCase().split(".").pop();

  switch (ext) {
    case "pdf":
      return extractTextFromPDF(buffer);
    case "docx":
    case "doc":
      return extractTextFromDOCX(buffer);
    default:
      throw new Error(
        `Unsupported file type: ${ext}. Please upload PDF or DOCX files.`
      );
  }
}
