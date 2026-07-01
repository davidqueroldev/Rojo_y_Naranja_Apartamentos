import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

// Instancia única: crear varios clientes en el navegador hace que compitan
// por el mismo lock interno de sesión de GoTrue y una petición se queda colgada.
let client: ReturnType<typeof createBrowserClient<Database>> | undefined

export function createClient() {
  if (!client) {
    client = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return client
}
