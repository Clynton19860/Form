import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function calculateCategoryAverage(
  likertAnswers: number[],
  categoryQuestions: number[]
): number {
  const categoryScores = categoryQuestions.map(q => likertAnswers[q - 1])
  const validScores = categoryScores.filter(score => score > 0)
  
  if (validScores.length === 0) return 0
  
  return Math.round(
    (validScores.reduce((sum, score) => sum + score, 0) / validScores.length) * 100
  ) / 100
}

export function getScoreLabel(score: number): string {
  const labels = ['', 'Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']
  return labels[score] || 'Not Answered'
}

export function generateResponseId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
