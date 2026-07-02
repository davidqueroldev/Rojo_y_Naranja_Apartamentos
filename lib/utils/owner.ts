import type { SupabaseClient, User } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase'

export async function requireOwner(
  supabase: SupabaseClient<Database>
): Promise<{ user: User | null; isOwner: boolean }> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { user: null, isOwner: false }
  const { data: isOwner } = await supabase.rpc('is_owner')
  return { user, isOwner: !!isOwner }
}
