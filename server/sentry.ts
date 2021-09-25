import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

Sentry.init({
  dsn: 'https://97933d06cca1473f881ae740eb6bd2f5@o1012894.ingest.sentry.io/5978462',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
