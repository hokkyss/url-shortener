const envConfig = {
  get dev() {
    return process.env.NODE_ENV === 'development'
  },
  get port() {
    return parseInt(process.env.APP_PORT ?? process.env.PORT ?? '8080', 10)
  },
  get secretKey() {
    return process.env.APP_SECRET_KEY ?? ''
  },
} as const

export default envConfig
