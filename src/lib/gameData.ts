export type QuestCategory = 'sql' | 'python' | 'security' | 'engineering'
export type Tier = 'beginner' | 'intermediate' | 'advanced'
export type ExperienceLevel = 'newbie' | 'practitioner' | 'senior'

export type Quest = {
  id: string
  from: string
  avatarColor: string
  category: QuestCategory
  tier: Tier
  message: string
  prompt: string
  expectedAnswer: string | RegExp
  hint: string
  reward: {
    budget: number
    accuracy: number
    xp: number
  }
  minLevel: number
}

export const SENDERS: Record<QuestCategory, { name: string; color: string }> = {
  sql: { name: 'Priya (Analytics Lead)', color: 'bg-emerald-500' },
  python: { name: 'Marcus (Data Science)', color: 'bg-teal-500' },
  security: { name: 'Zoe (SecOps)', color: 'bg-rose-500' },
  engineering: { name: 'Devon (Platform Eng)', color: 'bg-cyan-500' },
}

export const TIERS: Record<Tier, { label: string; color: string; description: string }> = {
  beginner: {
    label: 'Beginner',
    color:
      'text-sky-700 border-sky-400 bg-sky-50 dark:text-sky-300 dark:border-sky-700/50 dark:bg-sky-950/30',
    description: 'Core fundamentals — single-table SQL, basic scripting.',
  },
  intermediate: {
    label: 'Intermediate',
    color:
      'text-amber-700 border-amber-400 bg-amber-50 dark:text-amber-300 dark:border-amber-700/50 dark:bg-amber-950/30',
    description: 'Multi-table JOINs, moderate data cleaning and refactors.',
  },
  advanced: {
    label: 'Advanced',
    color:
      'text-fuchsia-700 border-fuchsia-400 bg-fuchsia-50 dark:text-fuchsia-300 dark:border-fuchsia-700/50 dark:bg-fuchsia-950/30',
    description: 'Window functions, ML fitting, pandas normalization.',
  },
}

export const EXPERIENCE_LEVELS: Record <
  ExperienceLevel,
  {
    label: string
    description: string
    startLevel: number
    xpBonus: number
    preferredTier: Tier
    autoExpandLessons: boolean
  }
> = {
  newbie: {
    label: 'Newbie',
    description: 'Never wrote code before. Start from the fundamentals with extra guidance.',
    startLevel: 1,
    xpBonus: 0,
    preferredTier: 'beginner',
    autoExpandLessons: true,
  },
  practitioner: {
    label: 'Practitioner',
    description: 'Know basic SQL/Python. Skip the basics and jump into real-world patterns.',
    startLevel: 1,
    xpBonus: 50,
    preferredTier: 'intermediate',
    autoExpandLessons: false,
  },
  senior: {
    label: 'Senior / Specialist',
    description: 'Experienced developer. Fast-track through early levels into advanced work.',
    startLevel: 3,
    xpBonus: 0,
    preferredTier: 'advanced',
    autoExpandLessons: false,
  },
}

export const QUEST_BANK: Quest[] = [
  {
    id: 'sql-1',
    from: SENDERS.sql.name,
    avatarColor: SENDERS.sql.color,
    category: 'sql',
    tier: 'beginner',
    message:
      "Hey! Can you write a SQL query to find the top sales rep by total revenue from the `sales` table?",
    prompt:
      '-- Table: sales(rep_name TEXT, revenue NUMERIC)\n-- Find the rep with the highest total revenue',
    expectedAnswer: /select[\s\S]*from[\s\S]*sales[\s\S]*(order by|max|group by)/i,
    hint: 'Try: SELECT rep_name, SUM(revenue) FROM sales GROUP BY rep_name ORDER BY SUM(revenue) DESC LIMIT 1;',
    reward: { budget: 120, accuracy: 1, xp: 20 },
    minLevel: 1,
  },
  {
    id: 'sql-2',
    from: SENDERS.sql.name,
    avatarColor: SENDERS.sql.color,
    category: 'sql',
    tier: 'intermediate',
    message:
      'Marketing needs a JOIN between `customers` and `orders` to see who has never ordered anything.',
    prompt:
      '-- Tables: customers(id, name), orders(id, customer_id)\n-- Find customers with zero orders',
    expectedAnswer: /left join[\s\S]*(is null|not in)/i,
    hint: 'Try: SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;',
    reward: { budget: 150, accuracy: 1.5, xp: 25 },
    minLevel: 1,
  },
  {
    id: 'sql-3',
    from: SENDERS.sql.name,
    avatarColor: SENDERS.sql.color,
    category: 'sql',
    tier: 'advanced',
    message:
      'Finance wants monthly revenue totals with a window function to show running totals. Can you draft it?',
    prompt: '-- Table: revenue(month TEXT, amount NUMERIC)\n-- Add a running total column',
    expectedAnswer: /over\s*\(/i,
    hint: 'Try: SELECT month, amount, SUM(amount) OVER (ORDER BY month) AS running_total FROM revenue;',
    reward: { budget: 220, accuracy: 2, xp: 35 },
    minLevel: 2,
  },
  {
    id: 'py-1',
    from: SENDERS.python.name,
    avatarColor: SENDERS.python.color,
    category: 'python',
    tier: 'intermediate',
    message:
      'Our customer dataset has missing values in the `age` column. Can you clean it with pandas?',
    prompt: "# df has a column 'age' with NaN values\n# Fill missing ages with the column mean",
    expectedAnswer: /fillna\([\s\S]*mean\(/i,
    hint: "Try: df['age'] = df['age'].fillna(df['age'].mean())",
    reward: { budget: 130, accuracy: 1.5, xp: 25 },
    minLevel: 1,
  },
  {
    id: 'py-2',
    from: SENDERS.python.name,
    avatarColor: SENDERS.python.color,
    category: 'python',
    tier: 'advanced',
    message:
      'Can you train a quick scikit-learn model to predict churn from our features dataframe?',
    prompt: '# X, y are already defined\n# Fit a classifier to predict churn',
    expectedAnswer: /\.fit\(\s*x/i,
    hint: 'Try: model = RandomForestClassifier()\nmodel.fit(X, y)',
    reward: { budget: 200, accuracy: 2.5, xp: 40 },
    minLevel: 2,
  },
  {
    id: 'py-3',
    from: SENDERS.python.name,
    avatarColor: SENDERS.python.color,
    category: 'python',
    tier: 'advanced',
    message: 'Quick one — normalize the `price` column so it is between 0 and 1.',
    prompt: "# df['price'] holds raw prices\n# Normalize to a 0-1 range",
    expectedAnswer: /(min\(\))[\s\S]*(max\(\))|minmaxscaler/i,
    hint: "Try: df['price'] = (df['price'] - df['price'].min()) / (df['price'].max() - df['price'].min())",
    reward: { budget: 140, accuracy: 1.5, xp: 25 },
    minLevel: 1,
  },
  {
    id: 'sec-1',
    from: SENDERS.security.name,
    avatarColor: SENDERS.security.color,
    category: 'security',
    tier: 'intermediate',
    message:
      "We're seeing weird traffic. Scan the server logs and flag IPs with more than 5 failed logins — could be brute-forcing.",
    prompt:
      '# logs: list of "IP - status" strings\n# Count failed attempts per IP, flag if > 5',
    expectedAnswer: /(count|>\s*5|counter)/i,
    hint: 'Try: from collections import Counter\nfailed = Counter(ip for ip, status in logs if status == "FAILED")\nflagged = [ip for ip, c in failed.items() if c > 5]',
    reward: { budget: 180, accuracy: 2, xp: 30 },
    minLevel: 1,
  },
  {
    id: 'sec-2',
    from: SENDERS.security.name,
    avatarColor: SENDERS.security.color,
    category: 'security',
    tier: 'beginner',
    message:
      'We need to store user passwords securely before launch. Hash them with SHA-256 before saving.',
    prompt: '# password: str\n# Produce a SHA-256 hash of the password',
    expectedAnswer: /sha256/i,
    hint: 'Try: import hashlib\nhashlib.sha256(password.encode()).hexdigest()',
    reward: { budget: 160, accuracy: 2, xp: 30 },
    minLevel: 1,
  },
  {
    id: 'sec-3',
    from: SENDERS.security.name,
    avatarColor: SENDERS.security.color,
    category: 'security',
    tier: 'advanced',
    message:
      "Pen test found our login form is vulnerable to SQL injection. Rewrite the query to use parameterized inputs.",
    prompt: "-- Unsafe: \"SELECT * FROM users WHERE name = '\" + input + \"'\"\n-- Rewrite safely",
    expectedAnswer: /\?|%s|:name|parameteri/i,
    hint: "Try: SELECT * FROM users WHERE name = ? -- bind input as a parameter, never concatenate",
    reward: { budget: 240, accuracy: 3, xp: 45 },
    minLevel: 2,
  },
  {
    id: 'eng-1',
    from: SENDERS.engineering.name,
    avatarColor: SENDERS.engineering.color,
    category: 'engineering',
    tier: 'beginner',
    message:
      'The nightly ETL job keeps failing silently. Can you add a try/except that logs the error?',
    prompt: '# Wrap risky_job() so failures are logged, not silent',
    expectedAnswer: /try:[\s\S]*except/i,
    hint: 'Try: try:\n    risky_job()\nexcept Exception as e:\n    log.error(e)',
    reward: { budget: 150, accuracy: 1.5, xp: 25 },
    minLevel: 1,
  },
  {
    id: 'eng-2',
    from: SENDERS.engineering.name,
    avatarColor: SENDERS.engineering.color,
    category: 'engineering',
    tier: 'intermediate',
    message:
      'We are duplicating the same API call in three places. Can you write a reusable function for it?',
    prompt: '# Refactor duplicate fetch logic into one reusable function',
    expectedAnswer: /function|def\s/i,
    hint: 'Try: function fetchData(url) { return fetch(url).then(r => r.json()) }',
    reward: { budget: 170, accuracy: 1.5, xp: 30 },
    minLevel: 2,
  },
]

export type Toolkit = {
  id: string
  name: string
  description: string
  cost: number
  category: QuestCategory
  icon: string
}

export const TOOLKITS: Toolkit[] = [
  {
    id: 'pandas',
    name: 'Pandas',
    description: 'Data wrangling superpowers. Cleans data quests 20% faster.',
    cost: 300,
    category: 'python',
    icon: '🐼',
  },
  {
    id: 'sklearn',
    name: 'Scikit-Learn',
    description: 'Unlocks ML modeling quests and boosts model accuracy gains.',
    cost: 500,
    category: 'python',
    icon: '🤖',
  },
  {
    id: 'sql-joins',
    name: 'SQL Joins Mastery',
    description: 'Unlocks advanced JOIN and window function quests.',
    cost: 350,
    category: 'sql',
    icon: '🔗',
  },
  {
    id: 'sha256',
    name: 'SHA-256 Hashing',
    description: 'Unlocks cryptography & secure-storage quests.',
    cost: 400,
    category: 'security',
    icon: '🔐',
  },
  {
    id: 'ids',
    name: 'Intrusion Detection',
    description: 'Unlocks brute-force / log-scanning quests.',
    cost: 450,
    category: 'security',
    icon: '🛰️',
  },
  {
    id: 'ci-cd',
    name: 'CI/CD Pipeline',
    description: 'Automates deploys, boosting XP from engineering quests.',
    cost: 550,
    category: 'engineering',
    icon: '⚙️',
  },
]

export type GpuUpgrade = {
  level: number
  name: string
  cost: number
  budgetMultiplier: number
}

export const GPU_UPGRADES: GpuUpgrade[] = [
  { level: 1, name: 'Shared CPU Instance', cost: 0, budgetMultiplier: 1 },
  { level: 2, name: 'Single GPU Node', cost: 400, budgetMultiplier: 1.15 },
  { level: 3, name: 'Multi-GPU Cluster', cost: 900, budgetMultiplier: 1.35 },
  { level: 4, name: 'TPU Pod', cost: 1800, budgetMultiplier: 1.6 },
  { level: 5, name: 'Exascale Data Center', cost: 3500, budgetMultiplier: 2 },
]

export type AutomationUpgrade = {
  id: string
  name: string
  description: string
  cost: number
  passiveBudgetPerTick: number
}

export const AUTOMATIONS: AutomationUpgrade[] = [
  {
    id: 'cron-jobs',
    name: 'Scheduled Cron Jobs',
    description: 'Passively generates compute budget every few seconds.',
    cost: 250,
    passiveBudgetPerTick: 3,
  },
  {
    id: 'auto-scaler',
    name: 'Auto-Scaler',
    description: 'Scales infra automatically, increasing passive income.',
    cost: 600,
    passiveBudgetPerTick: 8,
  },
  {
    id: 'ai-agent',
    name: 'Autonomous Data Agent',
    description: 'An AI agent that quietly runs jobs for you around the clock.',
    cost: 1200,
    passiveBudgetPerTick: 18,
  },
]

export const JOB_TITLES = [
  { level: 1, title: 'Junior Data Analyst' },
  { level: 2, title: 'Data Analyst' },
  { level: 3, title: 'Data Scientist' },
  { level: 4, title: 'Senior Data Scientist' },
  { level: 5, title: 'Security & Data Engineer' },
  { level: 6, title: 'Lead ML Engineer' },
  { level: 7, title: 'Principal Engineer' },
  { level: 8, title: 'VP of Data & Security' },
  { level: 9, title: 'Chief Data Officer' },
]

export function titleForLevel(level: number) {
  const match = [...JOB_TITLES].reverse().find((j) => level >= j.level)
  return match ? match.title : JOB_TITLES[0].title
}

export function xpForNextLevel(level: number) {
  return 80 + level * 40
}