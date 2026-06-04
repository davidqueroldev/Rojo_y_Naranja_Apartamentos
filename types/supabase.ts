// Generado con: npx supabase gen types typescript --local > types/supabase.ts
// Regenerar después de cada migración SQL

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          nombre: string | null
          rol: 'user' | 'owner'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          nombre?: string | null
          rol?: 'user' | 'owner'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string | null
          rol?: 'user' | 'owner'
          created_at?: string
        }
      }
      apartamentos: {
        Row: {
          id: string
          slug: string
          nombre: string
          descripcion: string | null
          precio_noche: number
          capacidad: number
          activo: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          nombre: string
          descripcion?: string | null
          precio_noche: number
          capacidad: number
          activo?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          nombre?: string
          descripcion?: string | null
          precio_noche?: number
          capacidad?: number
          activo?: boolean
          created_at?: string
        }
      }
      reservas: {
        Row: {
          id: string
          apartamento_id: string
          user_id: string
          fecha_entrada: string
          fecha_salida: string
          precio_total: number
          estado: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'completada' | 'anulada'
          stripe_session_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          apartamento_id: string
          user_id: string
          fecha_entrada: string
          fecha_salida: string
          precio_total: number
          estado?: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'completada' | 'anulada'
          stripe_session_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          apartamento_id?: string
          user_id?: string
          fecha_entrada?: string
          fecha_salida?: string
          precio_total?: number
          estado?: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'completada' | 'anulada'
          stripe_session_id?: string | null
          created_at?: string
        }
      }
      pagos: {
        Row: {
          id: string
          reserva_id: string
          stripe_payment_intent_id: string
          importe: number
          estado: string
          created_at: string
        }
        Insert: {
          id?: string
          reserva_id: string
          stripe_payment_intent_id: string
          importe: number
          estado: string
          created_at?: string
        }
        Update: {
          id?: string
          reserva_id?: string
          stripe_payment_intent_id?: string
          importe?: number
          estado?: string
          created_at?: string
        }
      }
      conversaciones: {
        Row: {
          id: string
          reserva_id: string
          modo_ia: boolean
          created_at: string
        }
        Insert: {
          id?: string
          reserva_id: string
          modo_ia?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          reserva_id?: string
          modo_ia?: boolean
          created_at?: string
        }
      }
      mensajes: {
        Row: {
          id: string
          conversacion_id: string
          contenido: string
          remitente: 'user' | 'owner' | 'ia'
          created_at: string
        }
        Insert: {
          id?: string
          conversacion_id: string
          contenido: string
          remitente: 'user' | 'owner' | 'ia'
          created_at?: string
        }
        Update: {
          id?: string
          conversacion_id?: string
          contenido?: string
          remitente?: 'user' | 'owner' | 'ia'
          created_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      rol: 'user' | 'owner'
      estado_reserva: 'pendiente_pago' | 'pendiente_confirmacion' | 'confirmada' | 'completada' | 'anulada'
      remitente_mensaje: 'user' | 'owner' | 'ia'
    }
  }
}
