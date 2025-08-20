import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

// Database types
export interface SurveyResponse {
  id: string
  email?: string
  likert_answers: number[]
  text_answers: string[]
  created_at: string
  updated_at: string
}

export interface LikertQuestion {
  id: number
  category: string
  question: string
  description?: string
}

export interface TextQuestion {
  id: number
  question: string
  description?: string
}
