import { useState } from 'react'
import { ChevronDown, ChevronRight, Clock } from 'lucide-react'
import { CURRICULUM_TRACKS } from '../lib/curriculum'

type Props = {
  activeTrackId: string
  activeModuleId: string | null
  onSelectTrack: (trackId: string) => void
  onSelectModule: (trackId: string, moduleId: string) => void
}

export function CurriculumSidebar({
  activeTrackId,
  activeModuleId,
  onSelectTrack,
  onSelectModule,
}: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['foundational', 'intermediate', 'advanced']),
  )

  function toggleCategory(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const activeTrack = CURRICULUM_TRACKS.find((t) => t.id === activeTrackId)

  return (
    <aside className="w-full lg:w-[280px] flex-shrink-0 border-r border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#0b100e] flex flex-col overflow-y-auto">
      <div className="p-3 border-b border-slate-200 dark:border-emerald-900/40">
        <p className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-emerald-700 mb-2">
          Track
        </p>
        <div className="flex flex-col gap-1.5">
          {CURRICULUM_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className={`text-left rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                activeTrackId === track.id
                  ? 'bg-emerald-600/10 text-emerald-700 border border-emerald-400 dark:bg-emerald-700/30 dark:text-emerald-200 dark:border-emerald-600/50'
                  : 'text-slate-600 border border-slate-200 hover:bg-slate-50 dark:text-emerald-600 dark:border-emerald-900/40 dark:hover:bg-emerald-900/20'
              }`}
            >
              {track.label}
              {track.comingSoon && (
                <span className="ml-2 inline-flex items-center gap-1 text-[9px] uppercase tracking-wide text-slate-400 dark:text-emerald-700">
                  <Clock className="w-2.5 h-2.5" />
                  Soon
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-3">
        {activeTrack?.comingSoon ? (
          <div className="text-center text-slate-400 dark:text-emerald-700 text-xs mt-8 px-2">
            <Clock className="w-5 h-5 mx-auto mb-2 opacity-60" />
            Python Pandas &amp; DataFrames modules are coming soon.
          </div>
        ) : (
          <div className="space-y-3">
            {activeTrack?.categories.map((category) => {
              const isOpen = expanded.has(category.id)
              return (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-emerald-500 py-1"
                  >
                    <span>{category.label}</span>
                    {isOpen ? (
                      <ChevronDown className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="mt-1 space-y-0.5 flash-in">
                      {category.modules.map((module) => {
                        const isActive = module.id === activeModuleId
                        return (
                          <button
                            key={module.id}
                            onClick={() => onSelectModule(activeTrackId, module.id)}
                            className={`w-full text-left rounded-md px-2.5 py-1.5 text-xs transition-colors ${
                              isActive
                                ? 'bg-emerald-50 text-emerald-700 border-l-2 border-emerald-500 dark:bg-emerald-900/30 dark:text-emerald-200'
                                : 'text-slate-600 hover:bg-slate-50 border-l-2 border-transparent dark:text-emerald-500 dark:hover:bg-emerald-900/20'
                            }`}
                          >
                            {module.title}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}