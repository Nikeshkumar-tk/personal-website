import Link from 'next/link'
import { ScrollReveal } from './ScrollReveal'
import { BlogCard } from './BlogCard'
import { blogPosts } from '@/data/blogs'

export function BlogSection() {
  const featuredPosts = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="py-32 px-6 bg-surface">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-xxl font-bold text-heading tracking-tight mb-4">
                Latest Writing
              </h2>
              <p className="text-muted text-lg max-w-lg">
                Thoughts on engineering, design, and the craft of building software.
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
