export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  coverImage: string
  body: string[]
}

export interface CareerStep {
  year: string
  title: string
  company: string
  description: string
}

export interface Dream {
  title: string
  description: string
  emoji: string
  span: 'sm' | 'md' | 'lg'
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
  dreams: Dream[]
  socials: SocialLink[]
  email: string
}

export interface ContactFormState {
  success: boolean
  message: string
}
