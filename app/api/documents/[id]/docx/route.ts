import { getCurrentUser } from "@/lib/auth/session";
import { getDocumentBundle } from "@/lib/documents/document-bundle";
import { generateContractDocx } from "@/lib/documents/generate-docx";
import { generateDocumentFileName } from "@/lib/documents/filename";
import { saveGeneratedDocumentMetadata, uploadGeneratedDocument } from "@/lib/documents/storage";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return new Response("Não autorizado.", { status: 401 });

  const { id } = await params;
  const bundle = getDocumentBundle(id);
  const bytes = await generateContractDocx(bundle);
  const fileName = generateDocumentFileName(bundle.document.title, "docx");
  const storagePath = await uploadGeneratedDocument(
    `${user.id}/${fileName}`,
    bytes,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  );
  await saveGeneratedDocumentMetadata(bundle, user.id, "docx", storagePath);

  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "no-store"
    }
  });
}
