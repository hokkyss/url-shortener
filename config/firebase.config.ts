import type { FirebaseOptions } from 'firebase/app'

import envConfig from './env.config'

const firebaseConfig: FirebaseOptions = {
  apiKey: envConfig.firebaseApiKey,
  appId: envConfig.firebaseAppId,
  authDomain: envConfig.firebaseAuthDomain,
  databaseURL: envConfig.firebaseDatabaseUrl,
  measurementId: envConfig.firebaseMeasurementId,
  messagingSenderId: envConfig.firebaseMessagingSenderId,
  projectId: envConfig.firebaseProjectId,
  storageBucket: envConfig.firebaseStorageBucket,
}

export default firebaseConfig
