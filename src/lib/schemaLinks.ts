export const LESSON_TABLE_MAP: Record<string, string[]> = {
  'sql-beginner-select': ['sales'],
  'sql-intermediate-joins': ['customers', 'orders'],
  'python-advanced-pandas': [],
  'python-intermediate-cleaning': [],
  'python-advanced-ml': [],
  'security-beginner-hashing': ['users'],
  'security-intermediate-logs': ['logs'],
  'security-advanced-injection': ['users'],
  'engineering-beginner-errors': [],
  'engineering-intermediate-refactor': [],
}

export function getTablesForLesson(lessonId: string): string[] {
  return LESSON_TABLE_MAP[lessonId] ?? []
}