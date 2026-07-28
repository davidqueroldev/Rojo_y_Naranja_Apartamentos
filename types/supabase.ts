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
      profiles: {
        Row: {
          id: string
          email: string
          nombre: string | null
          rol: Database["public"]["Enums"]["user_role"]
          created_at: string
        }
        Insert: {
          id: string
          email: string
          nombre?: string | null
          rol?: Database["public"]["Enums"]["user_role"]
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          nombre?: string | null
          rol?: Database["public"]["Enums"]["user_role"]
          created_at?: string
        }
        Relationships: []
      }
      solicitudes: {
        Row: {
          id: string
          tipo: Database["public"]["Enums"]["solicitud_tipo"]
          nombre: string
          apellidos: string | null
          telefono: string
          email: string
          apartamento_slug: string | null
          fecha_checkin: string | null
          fecha_checkout: string | null
          num_huespedes: number | null
          mensaje: string | null
          estado: Database["public"]["Enums"]["solicitud_estado"]
          token_confirmacion: string | null
          token_expira_en: string | null
          confirmada_en: string | null
          gestionada_en: string | null
          nota_interna: string | null
          ip_origen: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tipo: Database["public"]["Enums"]["solicitud_tipo"]
          nombre: string
          apellidos?: string | null
          telefono: string
          email: string
          apartamento_slug?: string | null
          fecha_checkin?: string | null
          fecha_checkout?: string | null
          num_huespedes?: number | null
          mensaje?: string | null
          estado?: Database["public"]["Enums"]["solicitud_estado"]
          token_confirmacion?: string | null
          token_expira_en?: string | null
          confirmada_en?: string | null
          gestionada_en?: string | null
          nota_interna?: string | null
          ip_origen?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tipo?: Database["public"]["Enums"]["solicitud_tipo"]
          nombre?: string
          apellidos?: string | null
          telefono?: string
          email?: string
          apartamento_slug?: string | null
          fecha_checkin?: string | null
          fecha_checkout?: string | null
          num_huespedes?: number | null
          mensaje?: string | null
          estado?: Database["public"]["Enums"]["solicitud_estado"]
          token_confirmacion?: string | null
          token_expira_en?: string | null
          confirmada_en?: string | null
          gestionada_en?: string | null
          nota_interna?: string | null
          ip_origen?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bloqueos_calendario: {
        Row: {
          id: string
          apartamento_slug: string
          fecha_inicio: string
          fecha_fin: string
          origen: Database["public"]["Enums"]["bloqueo_origen"]
          solicitud_id: string | null
          motivo: string | null
          created_at: string
        }
        Insert: {
          id?: string
          apartamento_slug: string
          fecha_inicio: string
          fecha_fin: string
          origen?: Database["public"]["Enums"]["bloqueo_origen"]
          solicitud_id?: string | null
          motivo?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          apartamento_slug?: string
          fecha_inicio?: string
          fecha_fin?: string
          origen?: Database["public"]["Enums"]["bloqueo_origen"]
          solicitud_id?: string | null
          motivo?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bloqueos_calendario_solicitud_id_fkey"
            columns: ["solicitud_id"]
            isOneToOne: false
            referencedRelation: "solicitudes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_owner: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      user_role: "owner"
      solicitud_tipo: "generica" | "reserva"
      solicitud_estado:
        | "pendiente_email"
        | "pendiente_gestion"
        | "aceptada"
        | "rechazada"
        | "cancelada"
        | "expirada"
      bloqueo_origen: "manual" | "solicitud"
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
