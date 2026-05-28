import { ScrollReveal } from '@/components/ScrollReveal'
import { BlogCard } from '@/components/BlogCard'
import { blogPosts } from '@/data/blogs'

export default function BlogPage() {
  return (
    <div className="pt-24 pb-32 px-6">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h1 className="text-hero font-bold text-heading tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-muted text-lg max-w-lg mb-16">
            Essays on engineering, design, and the craft of building software.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.07}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
