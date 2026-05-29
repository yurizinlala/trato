import {
  Briefcase,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
  ScrollText
} from "lucide-react";

export const internalRoutes = [
  { label: "Visão geral", href: "/dashboard", icon: LayoutDashboard },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Projetos", href: "/projetos", icon: Briefcase },
  { label: "Briefings", href: "/briefings", icon: ClipboardList },
  { label: "Contratos", href: "/contratos", icon: ScrollText },
  { label: "Documentos", href: "/documentos", icon: FileText },
  { label: "Configurações", href: "/configuracoes", icon: Settings }
];
