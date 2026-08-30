import { CodeBlockView, renderBold } from './LessonPanel'
import type { CurriculumModule } from '../lib/curriculum'

type Props = {
  module: CurriculumModule
}

export function CurriculumModuleView({ module }: Props) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-emerald-950/10 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-emerald-900/30">
        <h3 className="text-base font-semibold text-slate-800 dark:text-emerald-200">
          {module.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {module.keywords.map((kw) => (
            <span
              key={kw}
              className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-950/30 rounded px-1.5 py-0.5"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
            The Goal
          </p>
          <p className="text-[13px] text-teal-800/90 dark:text-teal-400/90 leading-relaxed">
            {module.goal}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
            Quick Example
          </p>
          <CodeBlockView code={module.example.code} />
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
            Key Concepts
          </p>
          <ul className="space-y-1.5">
            {module.keyConcepts.map((point, i) => (
              <li
                key={i}
                className="text-[13px] text-teal-800/90 dark:text-teal-400/90 leading-relaxed flex gap-1.5"
              >
                <span className="text-teal-500 dark:text-teal-600 flex-shrink-0">▸</span>
                <span>{renderBold(point)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
            The Blueprint
          </p>
          <CodeBlockView code={module.blueprint.code} />
        </div>

        <div className="flex gap-2 rounded border border-amber-300 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-2">
          <p className="text-[13px] text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
            <span className="font-semibold text-amber-700 dark:text-amber-300">Pro-Tip: </span>
            {module.proTip}
          </p>
        </div>
      </div>
    </div>
  )
}