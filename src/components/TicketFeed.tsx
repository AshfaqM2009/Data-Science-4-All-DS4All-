import { Database, ShieldAlert, Terminal as TerminalIcon, Wrench } from 'lucide-react'
import type { Quest } from '../lib/gameData'
import { TIERS } from '../lib/gameData'

const CATEGORY_ICON = {
  sql: Database,
  python: TerminalIcon,
  security: ShieldAlert,
  engineering: Wrench,
}

const CATEGORY_LABEL = {
  sql: 'SQL',
  python: 'Data Science',
  security: 'Security',
  engineering: 'Engineering',
}

type Props = {
  quests: Quest[]
  selectedId: string | null
  onSelect: (quest: Quest) => void
  completedCount: number
}

export function TicketFeed({ quests, selectedId, onSelect, completedCount }: Props) {
  return (
    <aside className="w-full lg:w-[320px] flex-shrink-0 border-r border-emerald-900/40 bg-[#0b100e] flex flex-col">
      <div className="px-4 py-3 border-b border-emerald-900/40 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 glow-pulse" />
          #team-quests
        </h2>
        <span className="text-[11px] text-emerald-700 font-mono">
          {completedCount} closed
        </span>
      </div>
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        {quests.length === 0 && (
          <div className="text-emerald-700 text-sm text-center mt-10 px-4">
            No new tickets right now. Level up to unlock more quests!
          </div>
        )}
        {quests.map((quest) => {
          const Icon = CATEGORY_ICON[quest.category]
          const isSelected = quest.id === selectedId
          return (
            <button
              key={quest.id}
              onClick={() => onSelect(quest)}
              className={`w-full text-left rounded-lg border px-3 py-2.5 transition-all flash-in ${
                isSelected
                  ? 'border-emerald-500/70 bg-emerald-900/30 shadow-[0_0_0_1px_rgba(52,211,153,0.3)]'
                  : 'border-emerald-900/40 bg-emerald-950/20 hover:border-emerald-700/60 hover:bg-emerald-900/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`w-6 h-6 rounded-full ${quest.avatarColor} flex items-center justify-center text-[10px] font-bold text-black/80 flex-shrink-0`}
                >
                  {quest.from.charAt(0)}
                </span>
                <span className="text-xs font-medium text-emerald-200 truncate">
                  {quest.from}
                </span>
                <span className="ml-auto flex items-center gap-1 text-[10px] uppercase tracking-wide text-emerald-600 border border-emerald-800/50 rounded px-1.5 py-0.5 flex-shrink-0">
                  <Icon className="w-3 h-3" />
                  {CATEGORY_LABEL[quest.category]}
                </span>
              </div>
              <div className="mb-1.5">
                <span
                  className={`text-[9px] uppercase tracking-wide border rounded px-1.5 py-0.5 ${TIERS[quest.tier].color}`}
                >
                  {TIERS[quest.tier].label}
                </span>
              </div>
              <p className="text-xs text-emerald-400/90 leading-snug">
                {quest.message}
              </p>
              <div className="mt-1.5 flex gap-2 text-[10px] font-mono text-emerald-600">
                <span>+${quest.reward.budget}</span>
                <span>+{quest.reward.xp}xp</span>
              </div>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
