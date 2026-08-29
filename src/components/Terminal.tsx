import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, Lightbulb, Send, XCircle } from 'lucide-react'
import type { Quest } from '../lib/gameData'
import { findLesson, LessonPanel } from './LessonPanel'

type Props = {
  quest: Quest | null
  onSolve: (quest: Quest) => void
  autoExpandLessons?: boolean
}

type FeedbackState = { kind: 'success' | 'error'; message: string } | null

export function Terminal({ quest, onSolve, autoExpandLessons = false }: Props) {
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  const [showHint, setShowHint] = useState(false)
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setCode(quest?.prompt ?? '')
    setFeedback(null)
    setShowHint(false)
  }, [quest?.id])

  function handleSubmit() {
    if (!quest) return
    const matches =
      quest.expectedAnswer instanceof RegExp
        ? quest.expectedAnswer.test(code)
        : code.toLowerCase().includes(quest.expectedAnswer.toLowerCase())

    if (matches) {
      setFeedback({
        kind: 'success',
        message: 'Query executed successfully. Output matches expected result.',
      })
      setSolvedIds((prev) => new Set(prev).add(quest.id))
      onSolve(quest)
    } else {
      setFeedback({
        kind: 'error',
        message: 'Execution failed — output does not match the expected result. Try again.',
      })
    }
  }

  return (
    <main className="flex-1 flex flex-col bg-[#080b09] min-w-0">
      <div className="px-4 py-3 border-b border-emerald-900/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500/70" />
          <span className="w-3 h-3 rounded-full bg-amber-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs font-mono text-emerald-600">
            {quest ? `~/quests/${quest.id}.sh` : '~/quests/idle'}
          </span>
        </div>
        {quest && (
          <button
            onClick={() => setShowHint((s) => !s)}
            className="flex items-center gap-1 text-[11px] text-emerald-500 hover:text-emerald-300 border border-emerald-800/50 rounded px-2 py-1"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4 min-h-0">
        {!quest ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center text-emerald-700 gap-2">
            <p className="font-mono text-sm">$ waiting for ticket selection_</p>
            <p className="text-xs text-emerald-800 max-w-sm">
              Pick a quest from the team feed to open it in the terminal.
            </p>
          </div>
        ) : (
          <>
            {(() => {
              const lesson = findLesson(quest.category, quest.tier)
              return lesson ? (
                <LessonPanel lesson={lesson} defaultExpanded={autoExpandLessons} />
              ) : null
            })()}

            <div className="mb-3 rounded-lg border border-emerald-900/40 bg-emerald-950/20 px-3 py-2">
              <p className="text-xs text-emerald-400">
                <span className="text-emerald-600 font-mono mr-1">task:</span>
                {quest.message}
              </p>
            </div>

            {showHint && (
              <div className="mb-3 rounded-lg border border-amber-800/40 bg-amber-950/20 px-3 py-2 flash-in">
                <p className="text-xs text-amber-400 font-mono">{quest.hint}</p>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 min-h-[200px] resize-none rounded-lg border border-emerald-900/50 bg-black/60 text-emerald-200 font-mono text-sm p-3 outline-none focus:border-emerald-600/70 focus:ring-1 focus:ring-emerald-600/40"
            />

            <div className="flex items-center justify-between mt-3">
              <div className="text-[11px] text-emerald-700 font-mono">
                {solvedIds.has(quest.id) ? (
                  <span className="text-emerald-400">✓ solved</span>
                ) : (
                  <span>ready to run</span>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-sm px-4 py-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Run &amp; Submit
              </button>
            </div>

            {feedback && (
              <div
                className={`mt-3 flex items-center gap-2 rounded-lg border px-3 py-2 text-sm flash-in ${
                  feedback.kind === 'success'
                    ? 'border-emerald-600/50 bg-emerald-900/30 text-emerald-300'
                    : 'border-rose-700/50 bg-rose-950/30 text-rose-300'
                }`}
              >
                {feedback.kind === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                )}
                {feedback.message}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}