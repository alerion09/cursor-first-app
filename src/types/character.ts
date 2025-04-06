// Character interface for LOTR API
export interface Character {
  _id: string;
  name: string;
  race: string;
  gender?: string;
  realm?: string;
  height?: string;
  spouse?: string;
  birth?: string;
  death?: string;
  wikiUrl?: string;
} 