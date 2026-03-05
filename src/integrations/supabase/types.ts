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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      access_requests: {
        Row: {
          access_type: string | null
          birth_date: string | null
          cep: string | null
          city: string | null
          complement: string | null
          confirm_email: string
          cpf: string
          created_at: string
          email: string
          full_name: string
          id: string
          institution_type: string | null
          institutional_phone: string | null
          neighborhood: string | null
          number: string | null
          personal_phone: string
          professional_register: string | null
          social_name: string | null
          state: string | null
          status: Database["public"]["Enums"]["request_status"]
          street: string | null
          system_function: string | null
          updated_at: string
        }
        Insert: {
          access_type?: string | null
          birth_date?: string | null
          cep?: string | null
          city?: string | null
          complement?: string | null
          confirm_email: string
          cpf: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          institution_type?: string | null
          institutional_phone?: string | null
          neighborhood?: string | null
          number?: string | null
          personal_phone: string
          professional_register?: string | null
          social_name?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          street?: string | null
          system_function?: string | null
          updated_at?: string
        }
        Update: {
          access_type?: string | null
          birth_date?: string | null
          cep?: string | null
          city?: string | null
          complement?: string | null
          confirm_email?: string
          cpf?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          institution_type?: string | null
          institutional_phone?: string | null
          neighborhood?: string | null
          number?: string | null
          personal_phone?: string
          professional_register?: string | null
          social_name?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          street?: string | null
          system_function?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      participants: {
        Row: {
          bio_sex: string | null
          birth_date: string
          cep: string | null
          city: string | null
          complaint_details: string | null
          complement: string | null
          cpf: string
          created_at: string
          created_by: string
          email: string | null
          father_name: string | null
          full_name: string
          gender_identity: string | null
          hearing_complaint: string | null
          id: string
          institution: string | null
          issue_date: string | null
          issuing_body: string | null
          mother_name: string
          neighborhood: string | null
          number: string | null
          observations: string | null
          phone: string | null
          race: string | null
          rg: string | null
          social_name: string | null
          state: string | null
          street: string | null
          teacher: string | null
          updated_at: string
        }
        Insert: {
          bio_sex?: string | null
          birth_date: string
          cep?: string | null
          city?: string | null
          complaint_details?: string | null
          complement?: string | null
          cpf: string
          created_at?: string
          created_by: string
          email?: string | null
          father_name?: string | null
          full_name: string
          gender_identity?: string | null
          hearing_complaint?: string | null
          id?: string
          institution?: string | null
          issue_date?: string | null
          issuing_body?: string | null
          mother_name: string
          neighborhood?: string | null
          number?: string | null
          observations?: string | null
          phone?: string | null
          race?: string | null
          rg?: string | null
          social_name?: string | null
          state?: string | null
          street?: string | null
          teacher?: string | null
          updated_at?: string
        }
        Update: {
          bio_sex?: string | null
          birth_date?: string
          cep?: string | null
          city?: string | null
          complaint_details?: string | null
          complement?: string | null
          cpf?: string
          created_at?: string
          created_by?: string
          email?: string | null
          father_name?: string | null
          full_name?: string
          gender_identity?: string | null
          hearing_complaint?: string | null
          id?: string
          institution?: string | null
          issue_date?: string | null
          issuing_body?: string | null
          mother_name?: string
          neighborhood?: string | null
          number?: string | null
          observations?: string | null
          phone?: string | null
          race?: string | null
          rg?: string | null
          social_name?: string | null
          state?: string | null
          street?: string | null
          teacher?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          cpf: string | null
          created_at: string
          full_name: string
          id: string
          institution: string | null
          phone: string | null
          social_name: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cpf?: string | null
          created_at?: string
          full_name?: string
          id?: string
          institution?: string | null
          phone?: string | null
          social_name?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cpf?: string | null
          created_at?: string
          full_name?: string
          id?: string
          institution?: string | null
          phone?: string | null
          social_name?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      test_results: {
        Row: {
          created_at: string
          hearing_status: Database["public"]["Enums"]["hearing_status"]
          id: string
          needs_reevaluation: boolean
          noise_level_db: number | null
          notes: string | null
          participant_id: string
          performed_at: string
          performed_by: string
          test_type: Database["public"]["Enums"]["test_type"]
        }
        Insert: {
          created_at?: string
          hearing_status?: Database["public"]["Enums"]["hearing_status"]
          id?: string
          needs_reevaluation?: boolean
          noise_level_db?: number | null
          notes?: string | null
          participant_id: string
          performed_at?: string
          performed_by: string
          test_type: Database["public"]["Enums"]["test_type"]
        }
        Update: {
          created_at?: string
          hearing_status?: Database["public"]["Enums"]["hearing_status"]
          id?: string
          needs_reevaluation?: boolean
          noise_level_db?: number | null
          notes?: string | null
          participant_id?: string
          performed_at?: string
          performed_by?: string
          test_type?: Database["public"]["Enums"]["test_type"]
        }
        Relationships: [
          {
            foreignKeyName: "test_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "facilitator" | "researcher"
      hearing_status: "normal" | "altered"
      request_status: "pending" | "approved" | "rejected"
      test_type: "audit" | "ouvir_brasil"
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
    Enums: {
      app_role: ["admin", "facilitator", "researcher"],
      hearing_status: ["normal", "altered"],
      request_status: ["pending", "approved", "rejected"],
      test_type: ["audit", "ouvir_brasil"],
    },
  },
} as const
