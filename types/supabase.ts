export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      apartamentos: {
        Row: {
          acepta_ninos: boolean | null
          activo: boolean | null
          amenities: string[] | null
          capacidad_max: number
          capacidad_min: number
          created_at: string | null
          descripcion: string | null
          fotos: string[] | null
          id: string
          nombre: string
          num_banos: number | null
          num_habitaciones: number | null
          precio_noche_base: number
          slug: string
        }
        Insert: {
          acepta_ninos?: boolean | null
          activo?: boolean | null
          amenities?: string[] | null
          capacidad_max: number
          capacidad_min?: number
          created_at?: string | null
          descripcion?: string | null
          fotos?: string[] | null
          id?: string
          nombre: string
          num_banos?: number | null
          num_habitaciones?: number | null
          precio_noche_base: number
          slug: string
        }
        Update: {
          acepta_ninos?: boolean | null
          activo?: boolean | null
          amenities?: string[] | null
          capacidad_max?: number
          capacidad_min?: number
          created_at?: string | null
          descripcion?: string | null
          fotos?: string[] | null
          id?: string
          nombre?: string
          num_banos?: number | null
          num_habitaciones?: number | null
          precio_noche_base?: number
          slug?: string
        }
        Relationships: []
      }
      bloqueos_calendario: {
        Row: {
          apartamento_id: string
          created_at: string | null
          fecha_fin: string
          fecha_inicio: string
          id: string
          motivo: string | null
        }
        Insert: {
          apartamento_id: string
          created_at?: string | null
          fecha_fin: string
          fecha_inicio: string
          id?: string
          motivo?: string | null
        }
        Update: {
          apartamento_id?: string
          created_at?: string | null
          fecha_fin?: string
          fecha_inicio?: string
          id?: string
          motivo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bloqueos_calendario_apartamento_id_fkey"
            columns: ["apartamento_id"]
            isOneToOne: false
            referencedRelation: "apartamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      consultas: {
        Row: {
          apartamento_id: string | null
          apellidos: string | null
          confirmada_en: string | null
          created_at: string | null
          email: string
          estado: string
          fecha_checkin: string | null
          fecha_checkout: string | null
          gestionada_en: string | null
          id: string
          mensaje: string | null
          nombre: string
          telefono: string
          tipo: string
          token_confirmacion: string | null
          token_expira_en: string | null
          updated_at: string | null
        }
        Insert: {
          apartamento_id?: string | null
          apellidos?: string | null
          confirmada_en?: string | null
          created_at?: string | null
          email: string
          estado?: string
          fecha_checkin?: string | null
          fecha_checkout?: string | null
          gestionada_en?: string | null
          id?: string
          mensaje?: string | null
          nombre: string
          telefono: string
          tipo: string
          token_confirmacion?: string | null
          token_expira_en?: string | null
          updated_at?: string | null
        }
        Update: {
          apartamento_id?: string | null
          apellidos?: string | null
          confirmada_en?: string | null
          created_at?: string | null
          email?: string
          estado?: string
          fecha_checkin?: string | null
          fecha_checkout?: string | null
          gestionada_en?: string | null
          id?: string
          mensaje?: string | null
          nombre?: string
          telefono?: string
          tipo?: string
          token_confirmacion?: string | null
          token_expira_en?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultas_apartamento_id_fkey"
            columns: ["apartamento_id"]
            isOneToOne: false
            referencedRelation: "apartamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      conversaciones: {
        Row: {
          created_at: string | null
          ia_contexto: string | null
          id: string
          modo_ia: boolean | null
          reserva_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          ia_contexto?: string | null
          id?: string
          modo_ia?: boolean | null
          reserva_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          ia_contexto?: string | null
          id?: string
          modo_ia?: boolean | null
          reserva_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversaciones_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversaciones_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mensajes: {
        Row: {
          contenido: string
          conversacion_id: string
          created_at: string | null
          id: string
          leido: boolean | null
          remitente: string
        }
        Insert: {
          contenido: string
          conversacion_id: string
          created_at?: string | null
          id?: string
          leido?: boolean | null
          remitente: string
        }
        Update: {
          contenido?: string
          conversacion_id?: string
          created_at?: string | null
          id?: string
          leido?: boolean | null
          remitente?: string
        }
        Relationships: [
          {
            foreignKeyName: "mensajes_conversacion_id_fkey"
            columns: ["conversacion_id"]
            isOneToOne: false
            referencedRelation: "conversaciones"
            referencedColumns: ["id"]
          },
        ]
      }
      pagos: {
        Row: {
          created_at: string | null
          estado: string
          id: string
          importe: number
          moneda: string | null
          reserva_id: string | null
          stripe_payment_intent_id: string | null
          tipo: string | null
        }
        Insert: {
          created_at?: string | null
          estado: string
          id?: string
          importe: number
          moneda?: string | null
          reserva_id?: string | null
          stripe_payment_intent_id?: string | null
          tipo?: string | null
        }
        Update: {
          created_at?: string | null
          estado?: string
          id?: string
          importe?: number
          moneda?: string | null
          reserva_id?: string | null
          stripe_payment_intent_id?: string | null
          tipo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_reserva_id_fkey"
            columns: ["reserva_id"]
            isOneToOne: false
            referencedRelation: "reservas"
            referencedColumns: ["id"]
          },
        ]
      }
      precios_especiales: {
        Row: {
          apartamento_id: string
          fecha_fin: string
          fecha_inicio: string
          id: string
          nombre: string
          notas: string | null
          precio_noche: number
        }
        Insert: {
          apartamento_id: string
          fecha_fin: string
          fecha_inicio: string
          id?: string
          nombre: string
          notas?: string | null
          precio_noche: number
        }
        Update: {
          apartamento_id?: string
          fecha_fin?: string
          fecha_inicio?: string
          id?: string
          nombre?: string
          notas?: string | null
          precio_noche?: number
        }
        Relationships: [
          {
            foreignKeyName: "precios_especiales_apartamento_id_fkey"
            columns: ["apartamento_id"]
            isOneToOne: false
            referencedRelation: "apartamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          apellidos: string | null
          avatar_url: string | null
          created_at: string | null
          id: string
          nombre: string
          rol: string
          telefono: string | null
          updated_at: string | null
        }
        Insert: {
          apellidos?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id: string
          nombre: string
          rol?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Update: {
          apellidos?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          nombre?: string
          rol?: string
          telefono?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reservas: {
        Row: {
          apartamento_id: string | null
          codigo: string
          created_at: string | null
          estado: string
          fecha_checkin: string
          fecha_checkout: string
          id: string
          notas_propietario: string | null
          notas_usuario: string | null
          num_huespedes: number
          precio_total: number
          stripe_session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          apartamento_id?: string | null
          codigo: string
          created_at?: string | null
          estado?: string
          fecha_checkin: string
          fecha_checkout: string
          id?: string
          notas_propietario?: string | null
          notas_usuario?: string | null
          num_huespedes: number
          precio_total: number
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          apartamento_id?: string | null
          codigo?: string
          created_at?: string | null
          estado?: string
          fecha_checkin?: string
          fecha_checkout?: string
          id?: string
          notas_propietario?: string | null
          notas_usuario?: string | null
          num_huespedes?: number
          precio_total?: number
          stripe_session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservas_apartamento_id_fkey"
            columns: ["apartamento_id"]
            isOneToOne: false
            referencedRelation: "apartamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calcular_precio_reserva: {
        Args: {
          p_apartamento_id: string
          p_fecha_fin: string
          p_fecha_inicio: string
        }
        Returns: number
      }
      check_disponibilidad: {
        Args: {
          p_apartamento_id: string
          p_fecha_fin: string
          p_fecha_inicio: string
          p_reserva_id?: string
        }
        Returns: boolean
      }
      is_owner: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
