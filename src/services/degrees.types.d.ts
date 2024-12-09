export interface Degree {
  id: number;
  name: string;
  image_url: string;
  disabled: boolean;
  ofertas?: { id: number }[];
}
