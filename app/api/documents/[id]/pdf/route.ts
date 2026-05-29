import { getCurrentUser } from "@/lib/auth/session";
import { getDocumentBundle } from "@/lib/documents/document-bundle";
import { generateDocumentFileName } from "@/lib/documents/filename";
import { generateContractPdf } from "@/lib/documents/generate-pdf";
import { saveGeneratedDocumentMetadata, uploadGeneratedDocument } from "@/lib/documents/storage";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return new Response("Não autorizado.", { status: 401 });

  const { id } = await params;
  const bundle = getDocumentBundle(id);
  const bytes = await generateContractPdf(bundle);
  const fileName = generateDocumentFileName(bundle.document.title, "pdf");
  const storagePath = await uploadGeneratedDocument(`${user.id}/${fileName}`, bytes, "application/pdf");
  await saveGeneratedDocumentMetadata(bundle, user.id, "pdf", storagePath);

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store"
    }
  });
}
