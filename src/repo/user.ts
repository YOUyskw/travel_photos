import { collection, doc, setDoc } from "firebase/firestore"
import {User} from "firebase/auth"
import { db } from "@/lib/firebase"

export const createUser = async (user: User) => {
  await setDoc(
    doc(collection(db, "user"), user.uid),
    {
      name: user.displayName,
      iconUrl: user.photoURL,
    }
  )
}