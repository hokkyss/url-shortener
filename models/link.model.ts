import type { FirestoreDataConverter } from 'firebase/firestore'

export default interface Link {
  from: string
  to: string
}

export const linkConverter: FirestoreDataConverter<Link> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)

    return {
      from: data.from,
      to: data.to,
    }
  },
  toFirestore() {
    // NOTE: No writes are allowed
    return {}
  },
}
