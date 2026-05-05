import { createClient } from '@supabase/supabase-js'

// Bypasses RLS - use only in server-side API routes that are authenticated
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder'
)
