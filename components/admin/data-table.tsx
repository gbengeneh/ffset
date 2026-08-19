import type { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
};

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  actions,
  emptyMessage = "Nothing here yet.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] p-8 text-center text-sm text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-white/8 bg-[rgba(20,14,15,0.5)] sm:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/8 text-left">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[var(--gold)]"
                >
                  {column.header}
                </th>
              ))}
              {actions ? <th className="px-4 py-3" /> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={rowKey(row)} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                {columns.map((column) => (
                  <td key={column.key} className={`px-4 py-3 text-[var(--text)] ${column.className ?? ""}`}>
                    {column.render(row)}
                  </td>
                ))}
                {actions ? <td className="px-4 py-3 text-right whitespace-nowrap">{actions(row)}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 sm:hidden">
        {rows.map((row) => (
          <div key={rowKey(row)} className="space-y-2 rounded-lg border border-white/8 bg-[rgba(20,14,15,0.5)] p-4">
            {columns.map((column) => (
              <div key={column.key} className="flex items-start justify-between gap-3 text-sm">
                <span className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--gold)]">
                  {column.header}
                </span>
                <span className="text-right text-[var(--text)]">{column.render(row)}</span>
              </div>
            ))}
            {actions ? <div className="flex flex-wrap justify-end gap-2 pt-2">{actions(row)}</div> : null}
          </div>
        ))}
      </div>
    </>
  );
}
