import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  role: 'user' | 'owner' | null
  setUser: (user: User | null) => void
  setRole: (role: 'user' | 'owner' | null) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  clear: () => set({ user: null, role: null }),
}))
