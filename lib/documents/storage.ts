import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseAdminConfigured } from "@/lib/supabase/config";
import type { DocumentBundle } from "@/lib/documents/document-bundle";

export async function uploadGeneratedDocument(path: string, bytes: Uint8Array | Buffer, contentType: string) {
  if (!isSupabaseAdminConfigured()) return null;

  const supabase = createAdminClient();
  const { data, error } = await supabase.storage.from("documents").upload(path, bytes, {
    contentType,
    upsert: true
  });

  if (error) {
    console.error(error);
    return null;
  }

  return data.path;
}

export async function saveGeneratedDocumentMetadata(
  bundle: DocumentBundle,
  userId: string,
  kind: "pdf" | "docx",
  storagePath: string | null
) {
  if (!isSupabaseAdminConfigured()) return;

  const supabase = createAdminClient();
  const { error } = await supabase.from("documents").upsert(
    {
      id: bundle.document.id,
      user_id: userId,
      client_id: bundle.document.clientId,
      project_id: bundle.document.projectId,
      contract_id: bundle.document.contractId ?? bundle.contract.id,
      title: bundle.document.title,
      type: bundle.document.type,
      status: bundle.document.status,
      file_name: bundle.document.fileName,
      date: bundle.document.date,
      version_history: bundle.document.versionHistory,
      ...(kind === "pdf" ? { storage_path_pdf: storagePath } : { storage_path_docx: storagePath })
    },
    { onConflict: "id" }
  );

  if (error) console.error(error);
}
