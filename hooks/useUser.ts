'use client'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuthStore } from '@/store/authStore'

export function useUser() {
  const { user, role, setUser, setRole, clear } = useAuthStore()

  useEffect(() => {
    const supabase = createClient()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          const { data } = await supabase
            .from('profiles')
            .select('rol')
            .eq('id', session.user.id)
            .single()
          setRole((data?.rol as 'user' | 'owner') ?? null)
        } else {
          clear()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, role }
}
