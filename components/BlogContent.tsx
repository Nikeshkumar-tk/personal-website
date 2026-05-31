import Image from 'next/image'
import type { BlogBlock } from '@/lib/types'
import { CodeBlock } from './CodeBlock'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-[1.05rem] leading-relaxed text-body">{block.text}</p>
      )

    case 'heading': {
      const id = block.id ?? slugify(block.text)
      if (block.level === 2) {
        return (
          <h2
            id={id}
            className="mt-6 scroll-mt-24 text-2xl font-semibold tracking-tight text-heading sm:text-3xl"
          >
            {block.text}
          </h2>
        )
      }
      return (
        <h3
          id={id}
          className="mt-4 scroll-mt-24 text-xl font-semibold tracking-tight text-heading sm:text-2xl"
        >
          {block.text}
        </h3>
      )
    }

    case 'code':
      return (
        <CodeBlock
          language={block.language}
          code={block.code}
          filename={block.filename}
        />
      )

    case 'image':
      return (
        <figure className="my-2 space-y-3">
          <div className="overflow-hidden rounded-card border border-border">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width ?? 1200}
              height={block.height ?? 800}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'quote':
      return (
        <blockquote className="my-2 border-l-2 border-accent pl-5">
          <p className="text-lg italic leading-relaxed text-heading">
            “{block.text}”
          </p>
          {block.cite && (
            <cite className="mt-2 block text-sm not-italic text-muted">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      )

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag
          className={`space-y-2 pl-6 text-body ${
            block.ordered ? 'list-decimal' : 'list-disc'
          } marker:text-accent/70`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </Tag>
      )
    }
  }
}

export function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
