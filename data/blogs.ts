import type { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-i-stopped-using-component-libraries',
    title: 'Why I Stopped Using Component Libraries',
    excerpt:
      'After years of reaching for shadcn, MUI, and Chakra, I realized something: the best component library is the one you don\'t have.',
    date: '2026-04-12',
    tags: ['Design Systems', 'React', 'DX'],
    coverImage:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    body: [
      'Every project starts the same way. You run `npx shadcn@latest init`, pick your theme, and feel the dopamine hit of having 50 beautiful components at your fingertips. But then the cracks start to show.',
      'The dropdown doesn\'t quite work the way you need it to. You override the styles, then the behavior, then the accessibility attributes. Six months in, you\'ve essentially rewritten the component from scratch — but it\'s still wearing the library\'s API like an ill-fitting suit.',
      'I\'m not saying component libraries are bad. They\'re incredible for prototyping and small teams. But once your product has a personality — once you care about every pixel and every transition — the abstraction cost outweighs the speed benefit. Build your own. It\'s fewer lines than you think.',
    ],
  },
  {
    slug: 'the-art-of-subtle-animation',
    title: 'The Art of Subtle Animation',
    excerpt:
      'Most websites animate too much. Here\'s how to make motion feel invisible — the highest compliment an animation can receive.',
    date: '2026-03-28',
    tags: ['Animation', 'UX', 'Framer Motion'],
    coverImage:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    body: [
      'Great animation is like great typography. When it\'s done right, nobody notices. They just feel that something is polished, intentional, and satisfying to use.',
      'The rule I follow: every animation should answer a question the user didn\'t know they were asking. Where did that element come from? Where did it go? Is this a new page or the same one? Duration matters less than easing. A 200ms animation with the right easing curve feels faster than a 100ms linear one.',
      'My practical recommendation: start with no animation. Ship the feature. Then watch someone use it without guidance. The moments where they hesitate, squint, or backtrack — those are your animation cues. Add motion only where the system needs to communicate, not where it looks cool.',
    ],
  },
  {
    slug: 'dark-mode-done-right',
    title: 'Dark Mode Done Right',
    excerpt:
      'Slapping `filter: invert(1)` on your site is not dark mode. Here\'s how to design a truly great dark experience.',
    date: '2026-02-15',
    tags: ['CSS', 'Design', 'Accessibility'],
    coverImage:
      'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
    body: [
      'The difference between a good dark mode and a great one comes down to contrast. Not enough, and text is unreadable. Too much, and it hurts to look at. The sweet spot for body text on a dark background is a contrast ratio between 12:1 and 15:1 — lower than you might expect, because pure white on pure black creates halation.',
      'Color perception also changes dramatically on dark backgrounds. A blue that looks vibrant on white looks washed out on black. You need to desaturate your colors and increase their lightness to maintain the same perceived intensity. This is why design tokens need separate light and dark values — you can\'t just invert them.',
      'Finally, respect the user\'s system preference. Use `prefers-color-scheme` as your default, but always offer a manual toggle. Forcing dark mode on someone in a bright room is as bad as forcing light mode at midnight. Preferences are personal, and the best dark mode is the one the user chose.',
    ],
  },
  {
    slug: 'building-a-cli-in-rust',
    title: 'Building a CLI Tool in Rust — Was It Worth It?',
    excerpt:
      'I rewrote a Node.js CLI in Rust. Here\'s what I learned about performance, developer experience, and whether you should do the same.',
    date: '2026-01-20',
    tags: ['Rust', 'CLI', 'DX'],
    coverImage:
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
    body: [
      'The Node.js CLI worked. It was 40ms on a warm start, 200ms cold. It processed the config file, validated inputs, and spat out results. But 200ms adds up when you\'re running it 50 times a day. So I rewrote it in Rust.',
      'The Rust version starts in 2ms. Two. Milliseconds. You can\'t even perceive it. It\'s done before your finger lifts off the Enter key. The binary is 4MB instead of 200MB of node_modules. It runs on machines without Node installed. Distribution is a single `curl | sh` away. These are real, tangible benefits.',
      'But here\'s the trade-off: development speed dropped significantly. Adding a new command in Node takes 10 minutes. In Rust, it takes an hour — lifetimes, borrowing, error propagation. Was it worth it? For a CLI I use daily, absolutely. For a CLI used by 5 people once a month, absolutely not. Choose your battles.',
    ],
  },
  {
    slug: 'tailwind-v4-what-changed',
    title: 'Tailwind v4 — What Actually Changed',
    excerpt:
      'Tailwind v4 ditched the config file for CSS-first configuration. Here\'s what that means for your projects and whether it\'s time to upgrade.',
    date: '2025-12-05',
    tags: ['CSS', 'Tailwind', 'Frontend'],
    coverImage:
      'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
    body: [
      'Tailwind v4 is the biggest architectural shift since the framework was created. The `tailwind.config.js` file is gone. Instead, you configure everything in CSS using the new `@theme` directive. This isn\'t just a syntax change — it\'s a philosophical one.',
      'Moving configuration into CSS means Tailwind can leverage the cascade, CSS variables, and all the native capabilities of the platform. Your theme values become actual CSS custom properties. Dark mode is just a `@media (prefers-color-scheme: dark)` block. Performance improves dramatically because the CSS engine doesn\'t need to resolve a JS config at build time.',
      'The migration path is straightforward for most projects. The new `@import "tailwindcss"` replaces the old directives. Utility classes haven\'t changed. But if you have a heavily customized config with plugins, extensions, and dynamic values, budget a weekend for the migration. The result is worth it — faster builds, smaller CSS, and a config that actually makes sense for a CSS framework.',
    ],
  },
  {
    slug: 'the-10x-engineer-is-a-myth',
    title: 'The 10x Engineer Is a Myth',
    excerpt:
      'We\'ve spent decades chasing the mythical developer who\'s 10x more productive. The real multiplier isn\'t individual — it\'s systemic.',
    date: '2025-11-18',
    tags: ['Engineering Culture', 'Career'],
    coverImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    body: [
      'Every company wants to hire the 10x engineer. The one who ships features in a day that take the rest of the team a sprint. The one who knows every layer of the stack and debugs production issues before they\'re reported. But here\'s the uncomfortable truth: the 10x engineer doesn\'t exist.',
      'What does exist is the 10x system. A team with clear documentation, fast CI, good test coverage, well-scoped tickets, and psychological safety. In that environment, everyone performs at 3-5x what they\'d achieve in a dysfunctional org. The multiplier isn\'t the individual — it\'s the environment.',
      'If you want to 10x your team\'s output, stop looking for superheroes. Fix your PR review latency. Write runbooks for common incidents. Delete 30% of your meeting load. Invest in internal tooling. These are force multipliers that compound across every engineer on the team. That\'s the real 10x.',
    ],
  },
]
