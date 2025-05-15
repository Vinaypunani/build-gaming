export type ComponentType = 'cpu' | 'motherboard' | 'memory' | 'storage' | 'gpu' | 'case' | 'powerSupply' | 'cooling';

export interface SelectedComponent {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  discount?: number;
  rating: number;
  reviews: number;
  stock: number;
  specs: Record<string, string>;
}

export interface PcBuild {
  cpu: SelectedComponent | null;
  motherboard: SelectedComponent | null;
  memory: SelectedComponent | null;
  storage: SelectedComponent | null;
  gpu: SelectedComponent | null;
  case: SelectedComponent | null;
  powerSupply: SelectedComponent | null;
  cooling: SelectedComponent | null;
} 