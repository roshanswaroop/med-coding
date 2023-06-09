export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          fullname: string | null
          id: string
          updated_at: string | null
          practice: string | null
          practice_address: string | null
          phonenumber: string | null
        }
        Insert: {
          fullname?: string | null
          id: string
          updated_at?: string | null
          practice?: string | null
          practice_address?: string | null
          phonenumber?: string | null
        }
        Update: {
          fullname?: string | null
          id?: string
          updated_at?: string | null
          practice?: string | null
          practice_address?: string | null
          phonenumber?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
