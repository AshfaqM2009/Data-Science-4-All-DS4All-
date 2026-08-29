import { useState } from 'react'
import { BookOpen, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import type { Tier, QuestCategory } from '../lib/gameData'
import lessonsData from '../data/lessons.json'

type CodeBlock = { code: string }

type Lesson = {
  id: string
  category: QuestCategory
  tier: Tier
  title: string
  goal: string
  example: CodeBlock
  keyConcepts: string[]
  syntaxTemplate: CodeBlock
  proTip: string
  keyTerms: string[]
}

const LESSONS = lessonsData.lessons as Lesson[]

export function findLesson(category: QuestCategory, tier: Tier): Lesson | undefined {
  return LESSONS.find((l) => l.category === category && l.tier === tier)
}

// Renders "**bold**" segments as styled <strong> without needing a markdown lib
function renderBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="text-teal-200 font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function CodeBlockView({ code }: { code: string }) {
  return (
    <pre className="text-[11px] font-mono text-emerald-300 bg-black/40 border border-teal-900/50 rounded px-2.5 py-2 overflow-x-auto whitespace-pre">
      {code}
    </pre>
  )
}

type Props = {
  lesson: Lesson
  defaultExpanded?: boolean
}

export function LessonPanel({ lesson, defaultExpanded = false }: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded)

  return (
    <div className="mb-3 rounded-lg border border-teal-800/40 bg-teal-950/20 overflow-hidden">
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between px-3 py-2 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-medium text-teal-300">
          <BookOpen className="w-3.5 h-3.5" />
          Lesson: {lesson.title}
        </span>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-teal-500" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-teal-500" />
        )}
      </button>

      {!expanded && (
        <p className="px-3 pb-2 text-[11px] text-teal-600">{lesson.goal}</p>
      )}

      {expanded && (
        <div className="px-3 pb-3 flash-in space-y-3">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-teal-500 font-semibold mb-1">
              The Goal
            </p>
            <p className="text-[11px] text-teal-400/90 leading-relaxed">{lesson.goal}</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-teal-500 font-semibold mb-1">
              Quick Example
            </p>
            <CodeBlockView code={lesson.example.code} />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-teal-500 font-semibold mb-1">
              Key Concepts
            </p>
            <ul className="space-y-1.5">
              {lesson.keyConcepts.map((point, i) => (
                <li key={i} className="text-[11px] text-teal-400/90 leading-relaxed flex gap-1.5">
                  <span className="text-teal-600 flex-shrink-0">▸</span>
                  <span>{renderBold(point)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wide text-teal-500 font-semibold mb-1">
              The Blueprint
            </p>
            <CodeBlockView code={lesson.syntaxTemplate.code} />
          </div>

          <div className="flex gap-2 rounded border border-amber-800/40 bg-amber-950/20 px-2.5 py-2">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-300/90 leading-relaxed">
              <span className="font-semibold text-amber-300">Pro-Tip: </span>
              {lesson.proTip}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {lesson.keyTerms.map((term) => (
              <span
                key={term}
                className="text-[10px] font-mono text-teal-500 border border-teal-800/50 rounded px-1.5 py-0.5"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}