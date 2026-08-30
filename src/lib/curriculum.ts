import curriculumData from '../data/curriculum.json'

export type CurriculumModule = {
  id: string
  title: string
  keywords: string[]
  goal: string
  example: { code: string }
  keyConcepts: string[]
  blueprint: { code: string }
  proTip: string
}

export type CurriculumCategory = {
  id: string
  label: string
  modules: CurriculumModule[]
}

export type CurriculumTrack = {
  id: string
  label: string
  comingSoon: boolean
  categories: CurriculumCategory[]
}

export const CURRICULUM_TRACKS = curriculumData.tracks as CurriculumTrack[]

export function findModule(trackId: string, moduleId: string): CurriculumModule | undefined {
  const track = CURRICULUM_TRACKS.find((t) => t.id === trackId)
  if (!track) return undefined
  for (const category of track.categories) {
    const found = category.modules.find((m) => m.id === moduleId)
    if (found) return found
  }
  return undefined
}