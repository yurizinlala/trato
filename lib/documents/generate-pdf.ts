import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getDocumentSections, getDocumentTitle } from "@/lib/documents/contract-content";
import type { DocumentBundle } from "@/lib/documents/document-bundle";

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxChars) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });

  if (line) lines.push(line);
  return lines;
}

export async function generateContractPdf(bundle: DocumentBundle) {
  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const title = getDocumentTitle(bundle.document);
  const sections = getDocumentSections(bundle.document, bundle.contract, bundle.client, bundle.project);
  let page = pdf.addPage([595.28, 841.89]);
  let y = 780;

  const newPage = () => {
    page = pdf.addPage([595.28, 841.89]);
    y = 780;
  };
  const drawLine = (text: string, options?: { size?: number; bold?: boolean; gap?: number }) => {
    if (y < 70) newPage();
    page.drawText(text, {
      x: 54,
      y,
      size: options?.size ?? 10,
      font: options?.bold ? bold : regular,
      color: rgb(0.067, 0.067, 0.067)
    });
    y -= options?.gap ?? 15;
  };

  wrapText(title, 48).forEach((line) => drawLine(line, { size: 18, bold: true, gap: 22 }));
  drawLine("Minuta gerada automaticamente. Revise antes de enviar para assinatura.", { size: 9, gap: 24 });

  sections.forEach((section, index) => {
    drawLine(`${index + 1}. ${section.title}`, { size: 12, bold: true, gap: 18 });
    section.body.flatMap((paragraph) => wrapText(paragraph, 92)).forEach((line) => drawLine(line, { size: 10, gap: 14 }));
    y -= 8;
  });

  return pdf.save();
}
