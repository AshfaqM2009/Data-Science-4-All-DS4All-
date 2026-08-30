import { Code2, Rocket, Sparkles } from 'lucide-react'
import { EXPERIENCE_LEVELS, type ExperienceLevel } from '../lib/gameData'

type Props = {
  onSelect: (level: ExperienceLevel) => void
}

const ICONS: Record<ExperienceLevel, React.ReactNode> = {
  newbie: <Sparkles className="w-5 h-5" />,
  practitioner: <Code2 className="w-5 h-5" />,
  senior: <Rocket className="w-5 h-5" />,
}

const PERKS: Record<ExperienceLevel, string[]> = {
  newbie: [
    'Start at Level 1',
    'Lesson drawers auto-expand',
    'Simple SQL tickets prioritized first',
  ],
  practitioner: [
    'Start at Level 1',
    '+50 XP starting bonus',
    'Intermediate tickets prioritized',
  ],
  senior: [
    'Fast-tracked starting level',
    'Advanced tickets unlocked immediately',
    'Lesson drawers stay collapsed',
  ],
}

export function OnboardingModal({ onSelect }: Props) {
  const levels = Object.keys(EXPERIENCE_LEVELS) as ExperienceLevel[]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl border border-emerald-300 dark:border-emerald-700/50 bg-white dark:bg-[#0b100e] shadow-[0_0_40px_rgba(16,185,129,0.15)] flash-in">
        <div className="border-b border-slate-200 dark:border-emerald-900/40 px-6 py-4">
          <p className="text-[11px] font-mono text-slate-400 dark:text-emerald-600 mb-1">
            $ onboarding --init
          </p>
          <h1 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 font-mono">
            Welcome to DS4All
          </h1>
          <p className="text-xs text-slate-500 dark:text-emerald-600 mt-1">
            Tell us where you&apos;re starting from so we can tune your first quests.
          </p>
        </div>

        <div className="p-5 grid gap-3 sm:grid-cols-3">
          {levels.map((key) => {
            const config = EXPERIENCE_LEVELS[key]
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className="group text-left rounded-lg border border-slate-200 dark:border-emerald-900/50 bg-slate-50 dark:bg-emerald-950/20 p-4 transition-all hover:border-emerald-400 dark:hover:border-emerald-500/70 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500/70"
              >
                <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                  {ICONS[key]}
                  <span className="font-mono text-sm font-semibold">{config.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-emerald-600 leading-relaxed mb-3">
                  {config.description}
                </p>
                <ul className="space-y-1">
                  {PERKS[key].map((perk) => (
                    <li key={perk} className="text-[10px] text-slate-500 dark:text-emerald-500 flex gap-1.5">
                      <span className="text-slate-400 dark:text-emerald-700">▸</span>
                      {perk}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>

        <div className="border-t border-slate-200 dark:border-emerald-900/40 px-6 py-3">
          <p className="text-[10px] text-slate-400 dark:text-emerald-800 font-mono">
            You can change this anytime from &quot;Change Experience Level&quot; in the top bar.
          </p>
        </div>
      </div>
    </div>
  )
}