import { TratoBadge } from "@/components/ui/TratoBadge";
import type { TratoStatus } from "@/types/status";

export function ProjectStatusBadge({ status }: { status: TratoStatus }) {
  return <TratoBadge status={status} />;
}
