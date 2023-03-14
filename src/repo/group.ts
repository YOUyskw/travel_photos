import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";

/**
 * グループを作成する
 * @param name グループ名
 * @param userId 作成者のユーザーID
 * @returns 作成されたルームID
 */
export const createGroup = async (name: string, userId: string) => {
  const ref = await addDoc(collection(db, "group"), {
    name,
    createdAt: serverTimestamp(),
    users: [doc(collection(db, "user"), userId)],
  });

  return ref.id;
};

/**
 * グループに参加する
 * @param groupId グループID
 * @param userId 参加するユーザーID
 */
export const joinGroup = async (groupId: string, userId: string) => {
  await updateDoc(doc(collection(db, "group"), groupId), {
    users: arrayUnion(doc(collection(db, "user"), userId)),
  });
};

/**
 * グループを取得する
 * @param groupId グループID
 * @returns グループ情報
 */
export const getGroup = async (groupId: string) => {
  const snapshot = await getDoc(doc(collection(db, "group"), groupId));
  const data = snapshot.data();

  const users = await Promise.all(
    data?.users.map(async (userRef: any) => {
      const snapshot = await getDoc(userRef);
      return snapshot.data();
    }) ?? []
  );

  return {
    name: data?.name,
    createdAt: data?.createdAt.toDate(),
    users,
  } as {
    name: string;
    createdAt: Date;
    users: {
      name: string;
      iconUrl: string;
    }[];
  };
};

/**
 * ユーザーが所属するグループの一覧情報を取得する
 * @param userId ユーザーID
 * @returns ユーザーが所属するグループ一覧
 */
export const getGroups = async (userId: string) => {
  const q = query(
    collection(db, "group"),
    where("users", "array-contains", doc(collection(db, "user"), userId))
  );
  const snapshots = await getDocs(q);
  const groups = await Promise.all(
    snapshots.docs.map(async (snapshot) => {
      const data = snapshot.data();
      const users = await Promise.all(
        data?.users.map(async (userRef: any) => {
          const snapshot = await getDoc(userRef);
          return snapshot.data();
        }) ?? []
      );

      return {
        name: data?.name,
        createdAt: data?.createdAt.toDate(),
        users,
      } as {
        name: string;
        createdAt: Date;
        users: {
          name: string;
          iconUrl: string;
        }[];
      };
    })
  );
  return groups;
};
