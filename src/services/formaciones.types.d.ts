import { Degree } from "./degrees.types";
import { TipoFormacion } from "./tipos-formaciones.types";

export interface Formacion {
  id: number;
  created_at: Date;
  degree_id: number;
  modalidad: string;
  lugar: string;
  capacidad: number;
  horas: number;
  descripcion: string;
  fecha: Date;
  id_tipo: number;
  url: string;
  degree?: Degree;
  tipo?: TipoFormacion;
}
