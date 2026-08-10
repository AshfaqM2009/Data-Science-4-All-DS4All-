import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { GameHeader } from '../components/GameHeader'
import { TicketFeed } from '../components/TicketFeed'
import { Terminal } from '../components/Terminal'
import { SkillTree } from '../components/SkillTree'
import { useGameState } from '../lib/useGameState'
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
    jobTitle,
    xpNeeded,
  } = useGameState()

  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null)

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e0c] text-emerald-500 font-mono text-sm">
        booting DS4All environment_
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e0c]">
      <GameHeader
        jobTitle={jobTitle}
        budget={state.budget}
        accuracy={state.accuracy}
        ticketsCompleted={state.ticketsCompleted}
        level={state.level}
        xp={state.xp}
        xpNeeded={xpNeeded}
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
