export type FactionId = 'amarr' | 'caldari' | 'gallente';

export interface FactionData {
  id: FactionId;
  name: string;
  shortName: string;
  tagline: string;
  description: string[];
  color: string;
  glowColor: string;
  bgImage: string; // Placeholder URL
  logo: string; // Placeholder URL
  ships: ShipData[];
  videoUrl: string; // Placeholder
}

export interface ShipData {
  name: string;
  class: string;
  description: string;
  imageUrl: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}