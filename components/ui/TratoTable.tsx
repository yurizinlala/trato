import type { ReactNode } from "react";
import { TratoCard } from "@/components/ui/TratoCard";
import { cn } from "@/lib/utils";

type TratoTableProps<T> = {
  columns: Array<{
    key: string;
    label: string;
    className?: string;
    nowrap?: boolean;
    priority?: "primary" | "secondary" | "meta" | "actions";
    render?: (row: T) => ReactNode;
  }>;
  rows: T[];
  getRowKey: (row: T) => string;
  empty?: ReactNode;
  stickyActions?: boolean;
  mobileRender?: (row: T) => ReactNode;
};

export function TratoTable<T extends object>({
  columns,
  rows,
  getRowKey,
  empty,
  stickyActions,
  mobileRender
}: TratoTableProps<T>) {
  if (!rows.length) return <>{empty}</>;

  const getCell = (row: T, key: string, render?: (row: T) => ReactNode) =>
    render ? render(row) : ((row as Record<string, ReactNode>)[key] as ReactNode);

  return (
    <>
      <div className="hidden border-3 border-ink-black bg-surface shadow-hard-lg md:block">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-soft-gray">
          <tr>
            {columns.map((column) => {
              const actionColumn = column.priority === "actions";
              return (
              <th
                key={column.key}
                className={cn(
                  "border-b-3 border-r-3 border-ink-black px-3 py-3 text-left font-mono text-xs font-bold uppercase last:border-r-0",
                  column.nowrap ? "whitespace-nowrap" : "break-words",
                  stickyActions && actionColumn && "sticky right-0 z-10 bg-soft-gray shadow-hard-sm",
                  column.className
                )}
              >
                {column.label}
              </th>
            );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="border-b-3 border-ink-black last:border-b-0 hover:bg-soft-sand">
              {columns.map((column) => {
                const actionColumn = column.priority === "actions";
                return (
                <td
                  key={column.key}
                  className={cn(
                    "border-r-3 border-ink-black px-3 py-3 align-top text-sm last:border-r-0",
                    column.nowrap ? "whitespace-nowrap" : "break-words",
                    stickyActions && actionColumn && "sticky right-0 z-10 bg-surface shadow-hard-sm",
                    column.className
                  )}
                >
                  {getCell(row, column.key, column.render)}
                </td>
              );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <TratoCard key={getRowKey(row)} variant="compact" className="bg-paper-cream">
            {mobileRender ? (
              mobileRender(row)
            ) : (
              <dl className="grid gap-3">
                {columns.map((column) => (
                  <div key={column.key} className={column.priority === "actions" ? "pt-2" : undefined}>
                    {column.priority !== "actions" ? (
                      <dt className="font-mono text-xs font-bold uppercase text-ink-black/65">{column.label}</dt>
                    ) : null}
                    <dd className={cn("mt-1 text-sm", column.priority === "primary" && "font-heading text-lg font-bold")}>
                      {getCell(row, column.key, column.render)}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </TratoCard>
        ))}
      </div>
    </>
  );
}
