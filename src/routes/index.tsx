import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { GameHeader } from '../components/GameHeader'
import { TicketFeed } from '../components/TicketFeed'
import { Terminal } from '../components/Terminal'
import { SkillTree } from '../components/SkillTree'
import { OnboardingModal } from '../components/OnboardingModal'
import { useGameState, EXPERIENCE_STORAGE_KEY } from '../lib/useGameState'
import type { Quest } from '../lib/gameData'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const {
    state,
    hydrated,
    activeQuests,
    availableToolkits,
    availableAutomations,
    completeQuest,
    buyToolkit,
    buyAutomation,
    upgradeGpu,
    applyExperienceLevel,
    jobTitle,
    xpNeeded,
  } = useGameState()

  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    if (!hydrated) return
    const hasChosen = window.localStorage.getItem(EXPERIENCE_STORAGE_KEY)
    if (!hasChosen) {
      setShowOnboarding(true)
    }
  }, [hydrated])

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e0c] text-emerald-500 font-mono text-sm">
        booting DS4All environment_
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e0c]">
      {showOnboarding && (
        <OnboardingModal
          onSelect={(level) => {
            applyExperienceLevel(level)
            setShowOnboarding(false)
          }}
        />
      )}

      <GameHeader
        jobTitle={jobTitle}
        budget={state.budget}
        accuracy={state.accuracy}
        ticketsCompleted={state.ticketsCompleted}
        level={state.level}
        xp={state.xp}
        xpNeeded={xpNeeded}
        onChangeExperience={() => setShowOnboarding(true)}
      />

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <TicketFeed
          quests={activeQuests}
          selectedId={selectedQuest?.id ?? null}
          onSelect={setSelectedQuest}
          completedCount={state.ticketsCompleted}
        />

        <Terminal
          quest={selectedQuest}
          onSolve={(quest) => {
            completeQuest(quest)
            setSelectedQuest(null)
          }}
          autoExpandLessons={state.autoExpandLessons}
        />

        <SkillTree
          budget={state.budget}
          gpuLevel={state.gpuLevel}
          toolkits={availableToolkits}
          unlockedToolkits={state.unlockedToolkits}
          automations={availableAutomations}
          unlockedAutomations={state.unlockedAutomations}
          onBuyToolkit={buyToolkit}
          onBuyAutomation={buyAutomation}
          onUpgradeGpu={upgradeGpu}
        />
      </div>
    </div>
  )
}