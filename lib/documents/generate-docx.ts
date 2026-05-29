import { Document as DocxDocument, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { getDocumentSections, getDocumentTitle } from "@/lib/documents/contract-content";
import type { DocumentBundle } from "@/lib/documents/document-bundle";

export async function generateContractDocx(bundle: DocumentBundle) {
  const title = getDocumentTitle(bundle.document);
  const sections = getDocumentSections(bundle.document, bundle.contract, bundle.client, bundle.project);
  const doc = new DocxDocument({
    sections: [
      {
        children: [
          new Paragraph({
            heading: HeadingLevel.TITLE,
            children: [new TextRun(title)]
          }),
          new Paragraph({
            children: [new TextRun("Minuta gerada automaticamente. Revise antes de enviar para assinatura.")]
          }),
          ...sections.flatMap((section, index) => [
            new Paragraph({
              heading: HeadingLevel.HEADING_2,
              children: [new TextRun(`${index + 1}. ${section.title}`)]
            }),
            ...section.body.map((paragraph) =>
              new Paragraph({
                children: [new TextRun(paragraph)]
              })
            )
          ])
        ]
      }
    ]
  });

  return Packer.toBuffer(doc);
}
