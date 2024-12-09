export interface Empresa {
  id: number;
  created_at: Date;
  name: string;
  image_url: string;
  color_rgb: string;
  text_color: string;
  url: string;
  plazas?: { id: number }[];
}
