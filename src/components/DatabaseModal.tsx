import { X } from 'lucide-react'
import { SchemaViewer } from './SchemaViewer'

type Props = {
  open: boolean
  onClose: () => void
  highlightTableIds?: string[]
}

export function DatabaseModal({ open, onClose, highlightTableIds = [] }: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl border border-emerald-700/50 bg-[#0b100e] shadow-[0_0_40px_rgba(16,185,129,0.15)] flash-in">
        <div className="flex items-center justify-between border-b border-emerald-900/40 px-5 py-3 flex-shrink-0">
          <div>
            <p className="text-[11px] font-mono text-emerald-600">$ db --inspect</p>
            <h2 className="text-sm font-semibold text-emerald-300 font-mono">
              Database Schema Reference
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-600 hover:text-emerald-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          <SchemaViewer highlightIds={highlightTableIds} />
        </div>
      </div>
    </div>
  )
}