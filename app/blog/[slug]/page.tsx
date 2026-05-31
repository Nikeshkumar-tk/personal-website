import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ViewTransition } from 'react'
import Link from 'next/link'
import { blogPosts } from '@/data/blogs'
import { BlogContent } from '@/components/BlogContent'
import { getReadingTime } from '@/lib/readingTime'
import { CopyLink } from './CopyLink'

// TODO: when posts move to an API, make this async (await the fetcher) and
// add `export const revalidate = ...` to control rebuild cadence.
export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} — Nikesh Kumar T.K`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const readingTime = getReadingTime(post)

  return (
    <article className="px-5 pb-20 pt-20 sm:px-6 sm:pb-32 sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-heading"
          transitionTypes={['nav-back']}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to all posts
        </Link>

        <header className="mb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
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
            <span className="text-xs text-muted">·</span>
            <span className="text-xs text-muted">{readingTime} min read</span>
          </div>

          <h1 className="text-xxl font-bold leading-tight tracking-tight text-heading sm:text-hero">
            {post.title}
          </h1>

          <p className="text-base text-muted sm:text-lg">{post.excerpt}</p>
        </header>

        <ViewTransition name={`blog-${post.slug}`} share="blog-morph">
          {/* Raw <img> intentional — next/image wraps in a span and breaks the share="blog-morph" view transition */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="mb-8 w-full rounded-card sm:mb-12"
          />
        </ViewTransition>

        <BlogContent blocks={post.body} />

        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Link
            href="/blog"
            className="text-sm text-muted transition-colors hover:text-accent"
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
