'use client'

import Link from 'next/link'
import { ViewTransition } from 'react'
import { motion } from 'framer-motion'
import type { BlogPost } from '@/lib/types'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block" data-cursor-hover>
      <ViewTransition
        name={`blog-${post.slug}`}
        share="blog-morph"
        enter={{ default: 'none' }}
        exit={{ default: 'none' }}
      >
        <article className="relative overflow-hidden rounded-card border border-border bg-surface hover:bg-surface-hover transition-colors duration-300">
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
          <div className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium uppercase tracking-widest text-accent"
                >
                  {tag}
                </span>
              ))}
              <span className="text-xs text-muted ml-auto">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h3
              className={`font-semibold text-heading tracking-tight group-hover:text-accent transition-colors duration-200 ${
                featured ? 'text-xl' : 'text-lg'
              }`}
            >
              {post.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </article>
      </ViewTransition>
    </Link>
  )
}
