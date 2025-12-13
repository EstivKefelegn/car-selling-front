// types/color.ts
export interface Color {
  id: number;
  name: string;
  hex_code: string;
  color_type?: 'exterior' | 'interior'; 
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  years: number[];
  models: string[];
  categories: string[];
  exteriorColors: Color[];
  interiorColors: Color[];

}