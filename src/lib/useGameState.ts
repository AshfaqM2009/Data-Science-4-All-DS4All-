import { useCallback, useEffect, useState } from 'react'
import {
  AUTOMATIONS,
  GPU_UPGRADES,
  QUEST_BANK,
  TOOLKITS,
  titleForLevel,
  xpForNextLevel,
  type Quest,
} from './gameData'

export type GameState = {
  budget: number
  accuracy: number
  ticketsCompleted: number
  xp: number
  level: number
  gpuLevel: number
  unlockedToolkits: string[]
  unlockedAutomations: string[]
  activeQuestIds: string[]
  completedQuestIds: string[]
  log: { id: string; text: string; kind: 'success' | 'error' | 'info' }[]
}

const STORAGE_KEY = 'ds4all-save-v1'

const initialState: GameState = {
  budget: 500,
  accuracy: 62,
  ticketsCompleted: 0,
  xp: 0,
  level: 1,
  gpuLevel: 1,
  unlockedToolkits: [],
  unlockedAutomations: [],
  activeQuestIds: [],
  completedQuestIds: [],
  log: [],
}

function loadState(): GameState {
  if (typeof window === 'undefined') return initialState
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const parsed = JSON.parse(raw)
    return { ...initialState, ...parsed }
  } catch {
    return initialState
  }
}

function pickQuests(state: GameState, count: number): Quest[] {
  const pool = QUEST_BANK.filter(
    (q) =>
      q.minLevel <= state.level &&
      !state.activeQuestIds.includes(q.id) &&
      !state.completedQuestIds.includes(q.id),
  )
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const loaded = loadState()
    setState(loaded)
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  // seed initial quests
  useEffect(() => {
    if (!hydrated) return
    if (state.activeQuestIds.length === 0) {
      const picks = pickQuests(state, 3)
      if (picks.length) {
        setState((s) => ({
          ...s,
          activeQuestIds: [...s.activeQuestIds, ...picks.map((p) => p.id)],
        }))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated])

  // passive income tick
  useEffect(() => {
    if (!hydrated) return
    const passive = AUTOMATIONS.filter((a) =>
      state.unlockedAutomations.includes(a.id),
    ).reduce((sum, a) => sum + a.passiveBudgetPerTick, 0)
    if (passive === 0) return
    const interval = setInterval(() => {
      setState((s) => ({ ...s, budget: Math.round(s.budget + passive) }))
    }, 3000)
    return () => clearInterval(interval)
  }, [state.unlockedAutomations, hydrated])

  const addLog = useCallback(
    (text: string, kind: 'success' | 'error' | 'info') => {
      setState((s) => ({
        ...s,
        log: [
          { id: `${Date.now()}-${Math.random()}`, text, kind },
          ...s.log,
        ].slice(0, 40),
      }))
    },
    [],
  )

  const completeQuest = useCallback((quest: Quest) => {
    setState((s) => {
      const gpu = GPU_UPGRADES.find((g) => g.level === s.gpuLevel) ?? GPU_UPGRADES[0]
      const budgetGain = Math.round(quest.reward.budget * gpu.budgetMultiplier)
      let xp = s.xp + quest.reward.xp
      let level = s.level
      let leveledUp = false
      while (xp >= xpForNextLevel(level)) {
        xp -= xpForNextLevel(level)
        level += 1
        leveledUp = true
      }
      const remainingActive = s.activeQuestIds.filter((id) => id !== quest.id)
      const completed = [...s.completedQuestIds, quest.id]
      const nextPicks = pickQuests(
        { ...s, activeQuestIds: remainingActive, completedQuestIds: completed, level },
        1,
      )
      return {
        ...s,
        budget: s.budget + budgetGain,
        accuracy: Math.min(100, Math.round((s.accuracy + quest.reward.accuracy) * 10) / 10),
        ticketsCompleted: s.ticketsCompleted + 1,
        xp,
        level,
        activeQuestIds: [...remainingActive, ...nextPicks.map((p) => p.id)],
        completedQuestIds: completed,
        log: [
          {
            id: `${Date.now()}-lvl`,
            text: leveledUp
              ? `Level up! You're now a ${titleForLevel(level)}.`
              : `+$${budgetGain} compute budget, +${quest.reward.xp} XP`,
            kind: 'success' as const,
          },
          ...s.log,
        ].slice(0, 40),
      }
    })
  }, [])

  const buyToolkit = useCallback((toolkitId: string, cost: number) => {
    setState((s) => {
      if (s.budget < cost || s.unlockedToolkits.includes(toolkitId)) return s
      return {
        ...s,
        budget: s.budget - cost,
        unlockedToolkits: [...s.unlockedToolkits, toolkitId],
      }
    })
  }, [])

  const buyAutomation = useCallback((id: string, cost: number) => {
    setState((s) => {
      if (s.budget < cost || s.unlockedAutomations.includes(id)) return s
      return {
        ...s,
        budget: s.budget - cost,
        unlockedAutomations: [...s.unlockedAutomations, id],
      }
    })
  }, [])

  const upgradeGpu = useCallback(() => {
    setState((s) => {
      const next = GPU_UPGRADES.find((g) => g.level === s.gpuLevel + 1)
      if (!next || s.budget < next.cost) return s
      return { ...s, budget: s.budget - next.cost, gpuLevel: next.level }
    })
  }, [])

  const activeQuests = state.activeQuestIds
    .map((id) => QUEST_BANK.find((q) => q.id === id))
    .filter((q): q is Quest => Boolean(q))

  const availableToolkits = TOOLKITS
  const availableAutomations = AUTOMATIONS

  return {
    state,
    hydrated,
    activeQuests,
    availableToolkits,
    availableAutomations,
    addLog,
    completeQuest,
    buyToolkit,
    buyAutomation,
    upgradeGpu,
    jobTitle: titleForLevel(state.level),
    xpNeeded: xpForNextLevel(state.level),
  }
}
