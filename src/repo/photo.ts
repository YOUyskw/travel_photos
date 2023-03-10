import { storage, db } from "@/lib/firebase";
import { collection, serverTimestamp, doc, getDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { setDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

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
  return {
    address: data?.address as string,
    createdAt: data?.createdAt.toDate() as Date,
    createdBy: data?.createdBy as string,
    downloadUrl: data?.downloadUrl as string,
    location: data?.location as Location,
  };
};
