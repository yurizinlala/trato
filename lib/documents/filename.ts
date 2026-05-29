export function slugFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 70);
}

export function generateDocumentFileName(title: string, extension: "pdf" | "docx") {
  return `${slugFileName(title) || "documento-trato"}.${extension}`;
}

