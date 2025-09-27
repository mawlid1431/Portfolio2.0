import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://stfrwzveehgxhwwqfbtt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZnJ3enZlZWhneGh3d3FmYnR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTcxNTQsImV4cCI6MjA3NDUzMzE1NH0.DZqx3Xx_QOvPqzkFD33yEr13e_rm6ifGyWoi6KrOUCo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Service {
  id: number
  name: string
  price: string
  description: string
  created_at?: string
  updated_at?: string
}

export interface Project {
  id: number
  name: string
  description: string
  is_live: boolean
  link: string
  image: string
  technology: string
  official_link: string
  created_at?: string
  updated_at?: string
}