
export type SectionId = 'hero' | 'what-we-do' | 'projects' | 'studio' | 'contact';
export type Language = 'de' | 'en';

export interface LocalizedString {
  de: string;
  en: string;
}

export interface Project {
  id: number;
  slug: string;
  /** Defaults to true. Set to false to hide from grid and sitemap (preview via URL still works). */
  published?: boolean;
  title: LocalizedString;
  category: LocalizedString;
  description: LocalizedString;
  year: string;
  image: string;
  gallery: string[];
  videoPosters?: { [videoUrl: string]: string };
  color: string;
}
