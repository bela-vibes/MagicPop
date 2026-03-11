
export type SectionId = 'hero' | 'what-we-do' | 'projects' | 'studio' | 'contact';
export type Language = 'de' | 'en';

export interface LocalizedString {
  de: string;
  en: string;
}

export interface Project {
  id: number;
  slug: string;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  year: string;
  image: string;
  gallery: string[];
  color: string;
}
