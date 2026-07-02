import { createAdminClient } from '@/lib/supabase/admin'

/** El email del usuario vive en auth.users, no en profiles — requiere el cliente con service role. */
export async function obtenerEmailUsuario(userId: string): Promise<string | null> {
  const admin = createAdminClient()
  const { data } = await admin.auth.admin.getUserById(userId)
  return data.user?.email ?? null
}
