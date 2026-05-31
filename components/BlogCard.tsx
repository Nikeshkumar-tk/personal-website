'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition } from 'react'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/types'
import { getReadingTime } from '@/lib/readingTime'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const readingTime = getReadingTime(post)

  return (
    <Link href={`/blog/${post.slug}`} className="group block" data-cursor-hover>
      <ViewTransition
        name={`blog-${post.slug}`}
        share="blog-morph"
        enter={{ default: 'none' }}
        exit={{ default: 'none' }}
      >
        <article className="relative overflow-hidden rounded-card border border-border bg-surface transition-colors duration-300 hover:bg-surface-hover">
          <div className="aspect-[16/10] overflow-hidden">
            <motion.div
              className="h-full w-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={500}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
          <div className="space-y-3 p-4 sm:p-5">
            <div className="flex items-center gap-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium uppercase tracking-widest text-accent"
                >
                  {tag}
                </span>
              ))}
              <span className="ml-auto text-xs text-muted">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h3
              className={`font-semibold tracking-tight text-heading transition-colors duration-200 group-hover:text-accent ${
                featured ? 'text-xl' : 'text-lg'
              }`}
            >
              {post.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <p className="text-[11px] uppercase tracking-widest text-muted/70">
              {readingTime} min read
            </p>
          </div>
        </article>
      </ViewTransition>
    </Link>
  )
}
