# DS4All — Data Science 4 All

DS4All is a dark-mode, gamified tech career simulator and tycoon game that teaches Data Science, SQL, Cybersecurity, and Software Engineering. Play as a Junior Data Analyst climbing the career ladder by solving quests sent by virtual teammates in a simulated Slack-style feed, submitting SQL/Python solutions in an in-browser terminal, and spending your earned compute budget on a tycoon-style skill tree of GPU upgrades, toolkits, and automation.

## Key Technologies

- **TanStack Start** + **React 19** + **TanStack Router**
- **Vite 7** for the build/dev pipeline
- **Tailwind CSS 4** for the dark, terminal-green themed UI
- **lucide-react** for icons
- **TypeScript** throughout, strict mode
- Client-side persistence via `localStorage` (no backend/database — the game is fully single-player and client-only)

## Running Locally

```bash
npm install
npm run dev
```

Then open the printed local URL. Progress (budget, XP, level, unlocked toolkits/automations) is saved automatically to your browser's local storage.

## Project Structure

See [AGENTS.md](./AGENTS.md) for a full breakdown of the architecture, game loop, and conventions.
