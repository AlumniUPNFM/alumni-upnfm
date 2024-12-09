import { Degree } from "@/services/degrees.types";

export interface User {
  dni: string;
  created_at: Date;
  names: string;
  last_names: string;
  degree_id: number;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  birthdate: Date | null;
  degree?: Degree | null;
  is_admin: boolean;
}
