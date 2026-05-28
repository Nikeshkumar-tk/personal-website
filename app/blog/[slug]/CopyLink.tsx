'use client'

import { useState } from 'react'

export function CopyLink() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="text-sm text-muted hover:text-heading transition-colors"
    >
      {copied ? 'Copied!' : 'Copy link'}
    </button>
  )
}
