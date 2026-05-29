export type Client = {
  id: string;
  name: string;
  company: string;
  document: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  address?: string;
  notes: string;
  projectIds: string[];
  lastActivity: string;
};
