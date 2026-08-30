import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../lib/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme, hydrated } = useTheme()

  if (!hydrated) {
    return <div className="w-[58px] h-[22px]" />
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark theme"
      className="flex items-center gap-1 text-[10px] border rounded px-1.5 py-0.5 transition-colors
        text-slate-600 border-slate-300 hover:border-slate-400 hover:bg-slate-100
        dark:text-emerald-600 dark:border-emerald-800/50 dark:hover:border-emerald-600/60 dark:hover:bg-emerald-900/30"
    >
      {theme === 'dark' ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  )
}