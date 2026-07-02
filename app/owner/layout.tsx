import { createClient } from '@/lib/supabase/server'
import { DashboardNav } from '@/components/layout/DashboardNav'

export default async function OwnerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = user
    ? await supabase.from('profiles').select('nombre').eq('id', user.id).single()
    : { data: null }

  return (
    <>
      <DashboardNav role="owner" nombre={profile?.nombre} />
      {children}
    </>
  )
}
