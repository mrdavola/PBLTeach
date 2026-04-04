// Dynamic imports to avoid loading pdf-parse/pdfjs-dist at module level
// (pdfjs-dist has native dependencies that can crash in serverless environments)

export async function extractText(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const ext = filename.toLowerCase().split(".").pop();

  switch (ext) {
    case "pdf": {
      const { extractTextFromPDF } = await import("./parse-pdf");
      return extractTextFromPDF(buffer);
    }
    case "docx":
    case "doc": {
      const { extractTextFromDOCX } = await import("./parse-docx");
      return extractTextFromDOCX(buffer);
    }
    default:
      throw new Error(
        `Unsupported file type: ${ext}. Please upload PDF or DOCX files.`
      );
  }
}
