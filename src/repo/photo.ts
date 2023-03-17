import { storage, db } from "@/lib/firebase";
import { collection, serverTimestamp, doc, getDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

const GROUPING_API_ENDPOINT =
  process.env.NEXT_PUBLIC_GROUPING_API_ENDPOINT ?? "http://localhost:5000";

type Location = {
  longitude: number;
  latitude: number;
};

/**
 * 写真を保存する
 * @param param0 保存する写真のパラメータ
 * @returns 保存された写真のID
 */
export const savePhoto = async ({
  image,
  groupId,
  createdBy,
  location,
  address,
}: {
  image: string;
  groupId: string;
  createdBy: string;
  location: Location;
  address: string;
}) => {
  const id = nanoid();
  const imageRef = ref(storage, `${groupId}/${id}`);
  await uploadString(imageRef, image, "data_url");
  const downloadUrl = await getDownloadURL(imageRef);

  await setDoc(
    doc(collection(doc(collection(db, "group"), groupId), "photo"), id),
    {
      downloadUrl,
      createdAt: serverTimestamp(),
      createdBy,
      location,
      address,
    }
  );

  await fetch(GROUPING_API_ENDPOINT);

  return id;
};

/**
 * 写真を１個取得する
 * @param groupId グループID
 * @param photoId 写真ID
 * @returns 写真データ
 */
export const getPhoto = async (groupId: string, photoId: string) => {
  const snapshot = await getDoc(
    doc(collection(doc(collection(db, "group"), groupId), "photo"), photoId)
  );
  const data = snapshot.data();

  const snapshot2 = await getDoc(
    doc(collection(db, "user"), "KL1eTfRwVFOZfxcgza5SWExlOHz2")
  );
  const user = {
    id: snapshot2.id,
    ...(snapshot2.data() ?? {}),
  };
  return {
    id: snapshot.id,
    address: data?.address as string,
    createdAt: data?.createdAt.toDate() as Date,
    createdBy: user as {
      id: string;
      name: string;
      iconUrl: string;
    },
    downloadUrl: data?.downloadUrl as string,
    location: data?.location as Location,
  };
};
