import { Cpu, Lock, Zap } from 'lucide-react'
import { GPU_UPGRADES, type AutomationUpgrade, type Toolkit } from '../lib/gameData'

type Props = {
  budget: number
  gpuLevel: number
  toolkits: Toolkit[]
  unlockedToolkits: string[]
  automations: AutomationUpgrade[]
  unlockedAutomations: string[]
  onBuyToolkit: (id: string, cost: number) => void
  onBuyAutomation: (id: string, cost: number) => void
  onUpgradeGpu: () => void
}

export function SkillTree({
  budget,
  gpuLevel,
  toolkits,
  unlockedToolkits,
  automations,
  unlockedAutomations,
  onBuyToolkit,
  onBuyAutomation,
  onUpgradeGpu,
}: Props) {
  const currentGpu = GPU_UPGRADES.find((g) => g.level === gpuLevel) ?? GPU_UPGRADES[0]
  const nextGpu = GPU_UPGRADES.find((g) => g.level === gpuLevel + 1)

  return (
    <aside className="w-full lg:w-[340px] flex-shrink-0 border-l border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-[#0b100e] flex flex-col overflow-y-auto">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-emerald-900/40">
        <h2 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          Skill Tree &amp; Upgrades
        </h2>
        <p className="text-[11px] text-slate-400 dark:text-emerald-700 mt-0.5">
          Tycoon progression menu
        </p>
      </div>

      <section className="px-4 py-3 border-b border-slate-200 dark:border-emerald-900/40">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Server GPU
          </h3>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-emerald-900/40 bg-slate-50 dark:bg-emerald-950/30 p-3">
          <p className="text-sm font-mono text-slate-800 dark:text-emerald-200">{currentGpu.name}</p>
          <p className="text-[11px] text-slate-500 dark:text-emerald-600 mb-2">
            Reward multiplier: {currentGpu.budgetMultiplier.toFixed(2)}x
          </p>
          {nextGpu ? (
            <button
              onClick={onUpgradeGpu}
              disabled={budget < nextGpu.cost}
              className="w-full flex items-center justify-between rounded-md border border-emerald-400 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-2 text-xs text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Upgrade → {nextGpu.name}</span>
              <span className="font-mono">${nextGpu.cost}</span>
            </button>
          ) : (
            <p className="text-[11px] text-emerald-600 dark:text-emerald-500">
              Max GPU tier reached 🎉
            </p>
          )}
        </div>
      </section>

      <section className="px-4 py-3 border-b border-slate-200 dark:border-emerald-900/40">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-2">
          Toolkits
        </h3>
        <div className="space-y-2">
          {toolkits.map((toolkit) => {
            const unlocked = unlockedToolkits.includes(toolkit.id)
            return (
              <div
                key={toolkit.id}
                className={`rounded-lg border px-3 py-2 ${
                  unlocked
                    ? 'border-emerald-400 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-slate-50 dark:bg-emerald-950/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{toolkit.icon}</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-emerald-200">
                      {toolkit.name}
                    </span>
                  </div>
                  {unlocked ? (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => onBuyToolkit(toolkit.id, toolkit.cost)}
                      disabled={budget < toolkit.cost}
                      className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-400 dark:border-emerald-700/50 rounded px-2 py-1 hover:bg-emerald-50 dark:hover:bg-emerald-800/30 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Lock className="w-3 h-3" />${toolkit.cost}
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-emerald-600 mt-1">
                  {toolkit.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Automation
          </h3>
        </div>
        <div className="space-y-2">
          {automations.map((auto) => {
            const unlocked = unlockedAutomations.includes(auto.id)
            return (
              <div
                key={auto.id}
                className={`rounded-lg border px-3 py-2 ${
                  unlocked
                    ? 'border-emerald-400 dark:border-emerald-700/50 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-slate-200 dark:border-emerald-900/40 bg-slate-50 dark:bg-emerald-950/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-800 dark:text-emerald-200">
                    {auto.name}
                  </span>
                  {unlocked ? (
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      +${auto.passiveBudgetPerTick}/tick
                    </span>
                  ) : (
                    <button
                      onClick={() => onBuyAutomation(auto.id, auto.cost)}
                      disabled={budget < auto.cost}
                      className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 border border-emerald-400 dark:border-emerald-700/50 rounded px-2 py-1 hover:bg-emerald-50 dark:hover:bg-emerald-800/30 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      ${auto.cost}
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-emerald-600 mt-1">
                  {auto.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </aside>
  )
}