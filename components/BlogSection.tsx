import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { BlogCard } from './BlogCard'
import { blogPosts } from '@/data/blogs'

export function BlogSection() {
  const featuredPosts = [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  return (
    <section id="blog" className="bg-surface px-5 py-20 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between sm:mb-16">
            <div>
              <h2 className="mb-4 text-xxl font-bold tracking-tight text-heading">
                Latest Writing
              </h2>
              <p className="max-w-lg text-base text-muted sm:text-lg">
                Notes on serverless, AWS, TypeScript, and shipping software that lasts.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              View all posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent"
          >
            View all posts
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
