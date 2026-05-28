import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <p className="text-8xl font-bold text-heading">404</p>
        <h1 className="text-2xl font-semibold text-heading">Page not found</h1>
        <p className="text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-button bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
        >
          Go back home
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 2l2 2m-2-2v8a1 1 0 001 1h3m10-11l2 2m-2-2v8a1 1 0 01-1 1h-3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
