import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      SENTRY_DSN ||
      'https://8fef27a42495418190f519bf41b9a465@o1012894.ingest.sentry.io/5978483',
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  })
}
