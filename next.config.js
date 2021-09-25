const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const moduleExports = {
  reactStrictMode: true,
}

const SentryWebpackPluginOptions = {
  silent: true,
}

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
