import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Database, Rocket, ShieldAlert, Terminal as TerminalIcon } from 'lucide-react'
import { GameHeader } from '../components/GameHeader'
import { SchemaViewer } from '../components/SchemaViewer'
import { CodeBlockView, renderBold, LESSONS } from '../components/LessonPanel'
import { CurriculumSidebar } from '../components/CurriculumSidebar'
import { CurriculumModuleView } from '../components/CurriculumModuleView'
import { getTablesForLesson } from '../lib/schemaLinks'
import { CURRICULUM_TRACKS, findModule } from '../lib/curriculum'
import { QUEST_BANK, TIERS, type QuestCategory, type Tier } from '../lib/gameData'
import { useGameState } from '../lib/useGameState'

export const Route = createFileRoute('/learn')({
  component: LearnPage,
})

const CATEGORY_ORDER: QuestCategory[] = ['sql', 'python', 'security', 'engineering']
const TIER_ORDER: Record<Tier, number> = { beginner: 0, intermediate: 1, advanced: 2 }

const CATEGORY_ICON = {
  sql: Database,
  python: TerminalIcon,
  security: ShieldAlert,
  engineering: Rocket,
}

const CATEGORY_LABEL = {
  sql: 'SQL',
  python: 'Data Science',
  security: 'Security',
  engineering: 'Engineering',
}

const DEFAULT_TRACK_ID = 'sql'
const DEFAULT_MODULE_ID = CURRICULUM_TRACKS.find((t) => t.id === DEFAULT_TRACK_ID)?.categories[0]
  ?.modules[0]?.id ?? null

function LearnPage() {
  const { state, hydrated, jobTitle, xpNeeded, applyExperienceLevel } = useGameState()
  const navigate = useNavigate()

  const [activeTrackId, setActiveTrackId] = useState(DEFAULT_TRACK_ID)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(DEFAULT_MODULE_ID)

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0e0c] text-emerald-600 dark:text-emerald-500 font-mono text-sm">
        booting DS4All environment_
      </div>
    )
  }

  function handleApply(category: QuestCategory, tier: Tier) {
    const quest = QUEST_BANK.find((q) => q.category === category && q.tier === tier)
    if (!quest) return
    navigate({ to: '/', search: { focus: quest.id } })
  }

  function handleSelectTrack(trackId: string) {
    setActiveTrackId(trackId)
    const track = CURRICULUM_TRACKS.find((t) => t.id === trackId)
    const firstModule = track?.categories[0]?.modules[0]?.id ?? null
    setActiveModuleId(firstModule)
  }

  const activeModule = activeModuleId ? findModule(activeTrackId, activeModuleId) : undefined

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0e0c]">
      <GameHeader
        jobTitle={jobTitle}
        budget={state.budget}
        accuracy={state.accuracy}
        ticketsCompleted={state.ticketsCompleted}
        level={state.level}
        xp={state.xp}
        xpNeeded={xpNeeded}
        mode="learn"
        onChangeExperience={() => applyExperienceLevel(state.experienceLevel ?? 'newbie')}
      />

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <CurriculumSidebar
          activeTrackId={activeTrackId}
          activeModuleId={activeModuleId}
          onSelectTrack={handleSelectTrack}
          onSelectModule={(trackId, moduleId) => {
            setActiveTrackId(trackId)
            setActiveModuleId(moduleId)
          }}
        />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-6 space-y-8">
            <section>
              <p className="text-[11px] font-mono text-slate-400 dark:text-emerald-600 mb-1">
                $ curriculum --module
              </p>
              <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 font-mono mb-4">
                Curriculum Hub
              </h2>

              {activeModule ? (
                <CurriculumModuleView module={activeModule} />
              ) : (
                <p className="text-xs text-slate-400 dark:text-emerald-700">
                  Select a module from the sidebar to get started.
                </p>
              )}
            </section>

            <section>
              <p className="text-[11px] font-mono text-slate-400 dark:text-emerald-600 mb-1">
                $ db --reference
              </p>
              <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 font-mono mb-3">
                Database Reference
              </h2>
              <p className="text-xs text-slate-500 dark:text-emerald-600 mb-4 max-w-2xl">
                These are the mock tables you'll query and manipulate throughout DS4All. Inspect
                column names, types, and sample data before writing any code in Hands-On Mode.
              </p>
              <SchemaViewer />
            </section>

            <section>
              <p className="text-[11px] font-mono text-slate-400 dark:text-emerald-600 mb-1">
                $ tickets --lessons
              </p>
              <h2 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 font-mono mb-4">
                Ticket-Linked Lessons
              </h2>
              <p className="text-xs text-slate-500 dark:text-emerald-600 mb-4 max-w-2xl">
                These lessons map directly to tickets in Hands-On Mode — jump straight to the
                matching quest from any of them.
              </p>

              <div className="space-y-8">
                {CATEGORY_ORDER.map((category) => {
                  const Icon = CATEGORY_ICON[category]
                  const lessons = LESSONS.filter((l) => l.category === category).sort(
                    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
                  )
                  if (lessons.length === 0) return null

                  return (
                    <div key={category}>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        <h3 className="text-sm font-semibold text-emerald-700 dark:text-emerald-300 font-mono">
                          {CATEGORY_LABEL[category]}
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {lessons.map((lesson) => {
                          const relatedTables = getTablesForLesson(lesson.id)
                          return (
                            <div
                              key={lesson.id}
                              className="rounded-lg border border-slate-200 dark:border-emerald-900/40 bg-white dark:bg-emerald-950/10 overflow-hidden"
                            >
                              <div className="px-4 py-3 border-b border-slate-200 dark:border-emerald-900/30 flex items-center justify-between flex-wrap gap-2">
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-emerald-200">
                                  {lesson.title}
                                </h4>
                                <span
                                  className={`text-[9px] uppercase tracking-wide border rounded px-1.5 py-0.5 ${TIERS[lesson.tier].color}`}
                                >
                                  {TIERS[lesson.tier].label}
                                </span>
                              </div>

                              <div className="p-4 space-y-3">
                                <div>
                                  <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
                                    The Goal
                                  </p>
                                  <p className="text-[12px] text-teal-800/90 dark:text-teal-400/90 leading-relaxed">
                                    {lesson.goal}
                                  </p>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
                                    Quick Example
                                  </p>
                                  <CodeBlockView code={lesson.example.code} />
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
                                    Key Concepts
                                  </p>
                                  <ul className="space-y-1.5">
                                    {lesson.keyConcepts.map((point, i) => (
                                      <li
                                        key={i}
                                        className="text-[12px] text-teal-800/90 dark:text-teal-400/90 leading-relaxed flex gap-1.5"
                                      >
                                        <span className="text-teal-500 dark:text-teal-600 flex-shrink-0">
                                          ▸
                                        </span>
                                        <span>{renderBold(point)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <p className="text-[10px] uppercase tracking-wide text-teal-600 dark:text-teal-500 font-semibold mb-1">
                                    The Blueprint
                                  </p>
                                  <CodeBlockView code={lesson.syntaxTemplate.code} />
                                </div>

                                <div className="flex gap-2 rounded border border-amber-300 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/20 px-2.5 py-2">
                                  <p className="text-[12px] text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
                                    <span className="font-semibold text-amber-700 dark:text-amber-300">
                                      Pro-Tip:{' '}
                                    </span>
                                    {lesson.proTip}
                                  </p>
                                </div>

                                {relatedTables.length > 0 && (
                                  <p className="text-[10px] text-slate-500 dark:text-emerald-600">
                                    Uses table{relatedTables.length > 1 ? 's' : ''}:{' '}
                                    <span className="font-mono text-slate-700 dark:text-emerald-400">
                                      {relatedTables.join(', ')}
                                    </span>
                                  </p>
                                )}

                                <button
                                  onClick={() => handleApply(lesson.category, lesson.tier)}
                                  className="flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white dark:text-black font-semibold text-xs px-3 py-1.5 transition-colors"
                                >
                                  Apply this in Hands-On Mode 🚀
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}