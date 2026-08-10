# AGENTS.md

This document orients AI agents and developers working on this codebase.

## Project Overview

DS4All (Data Science 4 All) is a dark-mode, gamified career simulator and tycoon game that teaches Data Science, SQL, Cybersecurity, and Software Engineering through simulated workplace "quests." Players solve SQL/Python/security challenges sent by virtual teammates, earn compute budget and XP, level up job titles, and spend budget on a tycoon-style skill tree (GPU upgrades, toolkits, automation).

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (dark theme, terminal-green accents) |
| Icons | lucide-react |
| Language | TypeScript 5.9 |
| Deployment | Netlify |

## Directory Structure

```
├── src
│   ├── components
│   │   ├── GameHeader.tsx   # Top stats dashboard: job title, budget, accuracy, tickets, XP bar
│   │   ├── TicketFeed.tsx   # Left sidebar: simulated Slack-style quest feed
│   │   ├── Terminal.tsx     # Center workspace: code/SQL editor with success/error feedback
│   │   └── SkillTree.tsx    # Right sidebar: GPU upgrades, toolkits, automation purchases
│   ├── lib
│   │   ├── gameData.ts      # Static game content: quest bank, toolkits, GPU tiers, automations, job titles
│   │   └── useGameState.ts  # Game state hook: progression logic, persistence, passive income tick
│   ├── routes
│   │   ├── __root.tsx       # Root HTML shell, dark theme, page metadata
│   │   └── index.tsx        # Composes header + ticket feed + terminal + skill tree
│   ├── router.tsx           # TanStack Router setup
│   └── styles.css           # Tailwind import + dark theme base styles/animations
├── netlify.toml              # Netlify build config
├── package.json
└── vite.config.ts
```

## Key Concepts

### Game Loop

1. `useGameState` (src/lib/useGameState.ts) seeds 3 active quests from `QUEST_BANK` filtered by player level.
2. Selecting a ticket in `TicketFeed` loads its starter code into `Terminal`.
3. Submitting code checks it against the quest's `expectedAnswer` (string or regex heuristic — this is a simulator, not a real interpreter).
4. On success: compute budget (scaled by GPU multiplier), accuracy, XP, and tickets-completed all update; a new quest is drawn to refill the feed; leveling up changes the displayed job title (`titleForLevel`).
5. Budget can be spent in `SkillTree` on GPU tier upgrades (multiply quest rewards), toolkits (thematic unlocks), and automations (passive budget income via a `setInterval` tick).

### Persistence

Game state is persisted client-side to `localStorage` (key `ds4all-save-v1`) in `useGameState`. There is no server-side database — this is intentional, since the entire simulation is single-player, client-only state with no cross-device or multi-user requirement.

### Adding New Quests

Add an entry to `QUEST_BANK` in `src/lib/gameData.ts` with a `category`, starter `prompt`, and an `expectedAnswer` (regex is preferred for flexibility). Set `minLevel` to gate it behind player progression.

## Development Commands

```bash
npm run dev      # Start dev server (vite dev --port 3000)
npm run build    # Production build
```

## Conventions

- Components: PascalCase, one per file under `src/components/`.
- Game content/logic: kept out of components, in `src/lib/gameData.ts` (data) and `src/lib/useGameState.ts` (behavior).
- Styling: Tailwind utility classes; dark palette built around `emerald`/`teal` accents on near-black backgrounds (`#0a0e0c`, `#0b100e`).
- TypeScript strict mode; type-only imports use the `type` keyword.
