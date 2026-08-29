import { Link } from '@tanstack/react-router'
import { BookOpen, Briefcase, DollarSign, Target, Ticket, UserCog, Zap } from 'lucide-react'

type Props = {
  jobTitle: string
  budget: number
  accuracy: number
  ticketsCompleted: number
  level: number
  xp: number
  xpNeeded: number
  mode: 'learn' | 'hands-on'
  onChangeExperience: () => void
}

export function GameHeader({
  jobTitle,
  budget,
  accuracy,
  ticketsCompleted,
  level,
  xp,
  xpNeeded,
  mode,
  onChangeExperience,
}: Props) {
  const xpPct = Math.min(100, Math.round((xp / xpNeeded) * 100))

  return (
    <header className="border-b border-emerald-900/40 bg-[#0d1310]/95 backdrop-blur sticky top-0 z-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-emerald-400 font-mono text-lg font-bold tracking-tight">
              DS4All
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-600/70 border border-emerald-700/40 rounded px-1.5 py-0.5">
              beta
            </span>

            <div className="flex items-center rounded-md border border-emerald-800/50 overflow-hidden ml-1">
              <Link
                to="/learn"
                className={`flex items-center gap-1 text-[11px] px-2 py-1 transition-colors ${
                  mode === 'learn'
                    ? 'bg-emerald-700/40 text-emerald-200'
                    : 'text-emerald-600 hover:text-emerald-300 hover:bg-emerald-900/30'
                }`}
              >
                <BookOpen className="w-3 h-3" />
                Learn Mode
              </Link>
              <Link
                to="/"
                className={`flex items-center gap-1 text-[11px] px-2 py-1 transition-colors border-l border-emerald-800/50 ${
                  mode === 'hands-on'
                    ? 'bg-emerald-700/40 text-emerald-200'
                    : 'text-emerald-600 hover:text-emerald-300 hover:bg-emerald-900/30'
                }`}
              >
                <Zap className="w-3 h-3" />
                Hands-On Mode
              </Link>
            </div>

            <button
              onClick={onChangeExperience}
              className="flex items-center gap-1 text-[10px] text-emerald-600 hover:text-emerald-300 border border-emerald-800/50 hover:border-emerald-600/60 rounded px-1.5 py-0.5 transition-colors"
            >
              <UserCog className="w-3 h-3" />
              Change Experience Level
            </button>
          </div>

          <div className="flex flex-1 flex-wrap gap-3 justify-end">
            <StatCard
              icon={<Briefcase className="w-4 h-4" />}
              label="Job Title"
              value={jobTitle}
              accent="text-emerald-300"
            />
            <StatCard
              icon={<DollarSign className="w-4 h-4" />}
              label="Compute Budget"
              value={`$${budget.toLocaleString()}`}
              accent="text-emerald-400"
            />
            <StatCard
              icon={<Target className="w-4 h-4" />}
              label="Model Accuracy"
              value={`${accuracy.toFixed(1)}%`}
              accent="text-teal-300"
            />
            <StatCard
              icon={<Ticket className="w-4 h-4" />}
              label="Tickets Completed"
              value={String(ticketsCompleted)}
              accent="text-emerald-300"
            />
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-600 whitespace-nowrap">
            LVL {level}
          </span>
          <div className="flex-1 h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-900/50">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500"
              style={{ width: `${xpPct}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-emerald-700 whitespace-nowrap">
            {xp}/{xpNeeded} XP
          </span>
        </div>
      </div>
    </header>
  )
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-emerald-900/40 bg-emerald-950/30 px-3 py-1.5 min-w-[140px]">
      <div className={`${accent}`}>{icon}</div>
      <div className="leading-tight">
        <div className="text-[10px] uppercase tracking-wide text-emerald-700">
          {label}
        </div>
        <div className={`text-sm font-mono font-semibold ${accent} truncate max-w-[140px]`}>
          {value}
        </div>
      </div>
    </div>
  )
}