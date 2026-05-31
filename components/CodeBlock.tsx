'use client'

import { useState } from 'react'

interface CodeBlockProps {
  language: string
  code: string
  filename?: string
}

export function CodeBlock({ language, code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Older browsers / clipboard denied — silently no-op
    }
  }

  return (
    <div className="my-2 max-w-full overflow-hidden rounded-card border border-[var(--color-code-border)] bg-[var(--color-code-bg)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--color-code-border)] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-2 w-2 shrink-0 rounded-full bg-accent/60" aria-hidden />
          {filename && (
            <span className="truncate font-mono text-xs text-muted">{filename}</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            data-cursor-hover
            aria-label={copied ? 'Copied' : 'Copy code'}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-muted transition-colors hover:bg-surface-hover hover:text-heading"
          >
            {copied ? (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.6}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-2M8 5a2 2 0 002 2h6a2 2 0 002-2M8 5a2 2 0 012-2h6a2 2 0 012 2v0m0 0h2a2 2 0 012 2v3"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-relaxed text-body [-webkit-overflow-scrolling:touch]">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  )
}
