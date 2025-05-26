
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing. Make sure you have connected Supabase in Lovable settings and VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.")
  // You might want to throw an error here or handle this case more gracefully
}

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)

