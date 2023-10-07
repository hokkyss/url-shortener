import type { FirebaseApp } from 'firebase/app'

import { initializeApp } from 'firebase/app'
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore'

import envConfig from '../config/env.config'
import firebaseConfig from '../config/firebase.config'
import { linkConverter } from '../models/link.model'

export class FirebaseService {
  private app: FirebaseApp

  public constructor() {
    this.app = initializeApp(firebaseConfig, envConfig.name)
  }

  private get firestore() {
    return getFirestore(this.app)
  }

  public async getLink(linkId: string) {
    const data = await getDoc(
      doc(this.firestore, 'shortenedLinks', linkId).withConverter(linkConverter)
    )

    return data
  }

  public async visitLink(linkId: string) {
    await addDoc(
      collection(this.firestore, 'shortenedLinks', linkId, 'visit-data'),
      {
        createdAt: Timestamp.fromDate(new Date()),
      }
    )
  }
}

export default new FirebaseService()
