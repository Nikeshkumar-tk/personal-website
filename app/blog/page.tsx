import { ScrollReveal } from '@/components/ScrollReveal'
import { BlogCard } from '@/components/BlogCard'
import { blogPosts } from '@/data/blogs'

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) =>
    b.date.localeCompare(a.date),
  )

  return (
    <div className="px-5 pb-20 pt-20 sm:px-6 sm:pb-32 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h1 className="mb-4 text-hero font-bold tracking-tight text-heading">
            Blog
          </h1>
          <p className="mb-12 max-w-lg text-base text-muted sm:mb-16 sm:text-lg">
            Notes on serverless, AWS, TypeScript, and the engineering decisions
            behind shipping software that lasts.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.07}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
