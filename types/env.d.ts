declare namespace NodeJS {
  interface ProcessEnv {
    APP_FIREBASE_API_KEY?: string
    APP_FIREBASE_APP_ID?: string
    APP_FIREBASE_AUTH_DOMAIN?: string
    APP_FIREBASE_DATABASE_URL?: string
    APP_FIREBASE_MEASUREMENT_ID?: string
    APP_FIREBASE_MESSAGING_SENDER_ID?: string
    APP_FIREBASE_PROJECT_ID?: string
    APP_FIREBASE_STORAGE_BUCKET?: string
    APP_NAME?: string
    APP_PORT?: string
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
