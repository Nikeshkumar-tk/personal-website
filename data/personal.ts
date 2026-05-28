import type { PersonalData } from '@/lib/types'

export const personalData: PersonalData = {
  name: 'Nikesh Kumar TK',
  tagline: 'Building products that feel like magic.',
  bio: `I'm a full-stack developer who thrives at the intersection of design and engineering. I believe great software should feel invisible — it just works, and it works beautifully. I spend my days crafting interfaces that respond to every interaction with intention, and systems that scale without ceremony.`,
  email: 'hello@nikesh.dev',
  career: [
    {
      year: '2024',
      title: 'Senior Frontend Engineer',
      company: 'ScaleX AI',
      description:
        'Leading the UI team building AI-powered analytics dashboards. Shipping a component library adopted by 12 product teams.',
    },
    {
      year: '2022',
      title: 'Full-Stack Developer',
      company: 'Vercel',
      description:
        'Built internal tooling and customer-facing features for the platform. Shipped the redesign of the deployment workflow used by 2M+ developers.',
    },
    {
      year: '2020',
      title: 'Frontend Engineer',
      company: 'Stripe',
      description:
        'Worked on Stripe Dashboard, rebuilt the Connect onboarding flow. Reduced drop-off rates by 23% through micro-interactions and progressive disclosure.',
    },
    {
      year: '2018',
      title: 'Junior Developer',
      company: 'Startup Studio',
      description:
        'First engineering role. Shipped 4 products in 18 months across React, Node.js, and React Native. Learned more in two years than I thought possible.',
    },
    {
      year: '2017',
      title: 'Computer Science Degree',
      company: 'University of Bangalore',
      description:
        'Graduated with a focus on HCI and distributed systems. Built a campus event platform used by 5,000 students as my capstone project.',
    },
  ],
  dreams: [
    {
      title: 'Open Source for India',
      description:
        'Build tools and libraries that make it easier for Indian developers to contribute to open source. Remove the language barrier from documentation.',
      emoji: '🇮🇳',
      span: 'lg',
    },
    {
      title: 'Design-Engineering Bridge',
      description:
        'Create a framework that generates production code directly from design files. Close the gap between Figma and React forever.',
      emoji: '🌉',
      span: 'md',
    },
    {
      title: 'Teach 100,000 Developers',
      description:
        'Write, record, and speak until I\'ve helped a hundred thousand developers break into the industry and build things they\'re proud of.',
      emoji: '🎓',
      span: 'md',
    },
    {
      title: 'Build a Calm Internet',
      description:
        'Products that respect attention. No dark patterns, no infinite scroll, no notification spam. Software that serves humans, not algorithms.',
      emoji: '🧘',
      span: 'sm',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/nikeshkumartk', icon: 'github' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nikeshkumartk', icon: 'linkedin' },
    { label: 'Twitter', href: 'https://twitter.com/nikeshkumartk', icon: 'twitter' },
    { label: 'Email', href: 'mailto:hello@nikesh.dev', icon: 'email' },
  ],
}
