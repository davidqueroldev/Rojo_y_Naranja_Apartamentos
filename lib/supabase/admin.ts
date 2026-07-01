import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

/** Cliente con service role — bypassa RLS. Usar solo en contextos de confianza (webhooks, tareas de servidor sin sesión de usuario). */
export function createAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
