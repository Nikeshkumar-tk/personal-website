import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blogs'
import { CopyLink } from './CopyLink'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <article className="pt-24 pb-32 px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-heading transition-colors mb-8"
          transitionTypes={['nav-back']}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to all posts
        </Link>

        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium uppercase tracking-widest text-accent"
              >
                {tag}
              </span>
            ))}
            <span className="text-xs text-muted">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="text-xxl sm:text-hero font-bold text-heading tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <ViewTransition name={`blog-${post.slug}`} share="blog-morph">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full rounded-card mb-12"
          />
        </ViewTransition>

        <div className="prose-custom space-y-6">
          {post.body.map((paragraph, i) => (
            <p
              key={i}
              className="text-body leading-relaxed text-[1.05rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-accent transition-colors"
            transitionTypes={['nav-back']}
          >
            ← All posts
          </Link>
          <div className="flex items-center gap-4">
            <CopyLink />
          </div>
        </div>
      </div>
    </article>
  )
}
