export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id?: string }
  | { type: 'code'; language: string; code: string; filename?: string }
  | {
      type: 'image'
      src: string
      alt: string
      caption?: string
      width?: number
      height?: number
    }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; ordered?: boolean; items: string[] }

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  coverImage: string
  body: BlogBlock[]
  readingTimeMinutes?: number
}

export interface CareerStep {
  year: string
  title: string
  company: string
  description: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'twitter' | 'email'
}

export interface PersonalData {
  name: string
  tagline: string
  bio: string
  career: CareerStep[]
  socials: SocialLink[]
  email: string
}

export interface ContactFormState {
  success: boolean
  message: string
}
