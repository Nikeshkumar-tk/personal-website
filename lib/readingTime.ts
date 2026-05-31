import type { BlogBlock, BlogPost } from './types'

const WORDS_PER_MINUTE = 220

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function blockWordCount(block: BlogBlock): number {
  switch (block.type) {
    case 'paragraph':
    case 'heading':
      return countWords(block.text)
    case 'quote':
      return countWords(block.text) + (block.cite ? countWords(block.cite) : 0)
    case 'list':
      return block.items.reduce((sum, item) => sum + countWords(item), 0)
    case 'code':
      return Math.ceil(countWords(block.code) / 2)
    case 'image':
      return block.caption ? countWords(block.caption) : 0
  }
}

export function getReadingTime(post: BlogPost): number {
  if (post.readingTimeMinutes) return post.readingTimeMinutes
  const total = post.body.reduce((sum, b) => sum + blockWordCount(b), 0)
  return Math.max(1, Math.round(total / WORDS_PER_MINUTE))
}
