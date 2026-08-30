import { Database } from 'lucide-react'
import schemasData from '../data/schemas.json'

type Column = { name: string; type: string; description: string }
type TableSchema = {
  id: string
  name: string
  description: string
  columns: Column[]
  sampleRows: Record<string, string | number>[]
}

const TABLES = schemasData.tables as TableSchema[]

type Props = {
  tableIds?: string[]
  highlightIds?: string[]
}

export function SchemaViewer({ tableIds, highlightIds = [] }: Props) {
  const filtered = tableIds ? TABLES.filter((t) => tableIds.includes(t.id)) : TABLES
  const sorted = [...filtered].sort((a, b) => {
    const aHi = highlightIds.includes(a.id) ? 0 : 1
    const bHi = highlightIds.includes(b.id) ? 0 : 1
    return aHi - bHi
  })

  if (sorted.length === 0) {
    return (
      <p className="text-[11px] text-slate-400 dark:text-emerald-700 italic">
        No mock tables are used by this lesson.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {sorted.map((table) => {
        const isHighlighted = highlightIds.includes(table.id)
        return (
          <div
            key={table.id}
            className={`rounded-lg border overflow-hidden ${
              isHighlighted
                ? 'border-emerald-500/60 shadow-[0_0_16px_rgba(16,185,129,0.15)]'
                : 'border-slate-200 dark:border-emerald-900/40'
            }`}
          >
            <div className="bg-slate-50 dark:bg-emerald-950/30 px-3 py-2 flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-500 flex-shrink-0" />
              <span className="font-mono text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
                {table.name}
              </span>
              {isHighlighted && (
                <span className="ml-auto text-[9px] uppercase tracking-wide text-emerald-700 dark:text-emerald-400 border border-emerald-400 dark:border-emerald-600/50 rounded px-1.5 py-0.5">
                  used in this quest
                </span>
              )}
            </div>
            <p className="px-3 pt-2 text-[11px] text-slate-500 dark:text-emerald-600">
              {table.description}
            </p>

            <div className="p-3 overflow-x-auto">
              <table className="w-full text-[11px] mb-3">
                <thead>
                  <tr className="text-slate-500 dark:text-emerald-500 border-b border-slate-200 dark:border-emerald-900/50">
                    <th className="text-left font-mono font-semibold py-1 pr-3">Column</th>
                    <th className="text-left font-mono font-semibold py-1 pr-3">Type</th>
                    <th className="text-left font-mono font-semibold py-1">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {table.columns.map((col) => (
                    <tr key={col.name} className="border-b border-slate-100 dark:border-emerald-950/50">
                      <td className="py-1 pr-3 font-mono text-slate-800 dark:text-emerald-300">
                        {col.name}
                      </td>
                      <td className="py-1 pr-3 font-mono text-teal-700 dark:text-teal-400">
                        {col.type}
                      </td>
                      <td className="py-1 text-slate-500 dark:text-emerald-600">
                        {col.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-emerald-700 mb-1">
                Sample rows
              </p>
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-slate-500 dark:text-emerald-600 border-b border-slate-200 dark:border-emerald-900/50">
                    {table.columns.map((col) => (
                      <th key={col.name} className="text-left font-mono py-1 pr-3">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.sampleRows.map((row, i) => (
                    <tr key={i} className="border-b border-slate-100 dark:border-emerald-950/50">
                      {table.columns.map((col) => (
                        <td key={col.name} className="py-1 pr-3 font-mono text-slate-700 dark:text-emerald-400">
                          {String(row[col.name])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}