import { Degree } from "./degrees.types";
import { Empresa } from "./empresas.types";

export interface Trabajo {
  id: number;
  created_at: Date;
  puesto: string;
  degree_id: number;
  empresa_id: number;
  salario: number;
  ubicacion: string;
  tipo_oferta: string;
  jornada: string;
  contrato: string;
  experiencia_laboral: number;
  idiomas: string;
  description: string;
  degree?: Degree;
  empresa?: Empresa;
}
