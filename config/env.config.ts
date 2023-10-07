const envConfig = {
  get dev() {
    return process.env.NODE_ENV === 'development'
  },
  get firebaseApiKey() {
    return process.env.APP_FIREBASE_API_KEY ?? ''
  },
  get firebaseAppId() {
    return process.env.APP_FIREBASE_APP_ID ?? ''
  },
  get firebaseAuthDomain() {
    return process.env.APP_FIREBASE_AUTH_DOMAIN ?? ''
  },
  get firebaseDatabaseUrl() {
    return process.env.APP_FIREBASE_DATABASE_URL ?? ''
  },
  get firebaseMeasurementId() {
    return process.env.APP_FIREBASE_MESSAGING_SENDER_ID ?? ''
  },
  get firebaseMessagingSenderId() {
    return process.env.APP_FIREBASE_MESSAGING_SENDER_ID ?? ''
  },
  get firebaseProjectId() {
    return process.env.APP_FIREBASE_PROJECT_ID ?? ''
  },
  get firebaseStorageBucket() {
    return process.env.APP_FIREBASE_STORAGE_BUCKET ?? ''
  },
  get name() {
    return process.env.APP_NAME ?? '[DEFAULT]'
  },
  get port() {
    return parseInt(process.env.APP_PORT ?? process.env.PORT ?? '8008', 10)
  },
} as const

export default envConfig
