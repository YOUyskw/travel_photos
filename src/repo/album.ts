import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { DUMMY_ALBUMS } from "./dummy";

/**
 * あるグループが持つアルバムの一覧を取得する
 */
export const getAlbums = async (groupId: string) => {
  const albumRef = collection(db, "group", groupId, "grouping_photo");
  const snapshots = await getDocs(albumRef);

  const album = snapshots.docs.map((snapshot) => snapshot.id);

  const data = await Promise.all(
    album.map(async (albumId) => {
      const ref = collection(
        db,
        "group",
        groupId,
        "grouping_photo",
        albumId,
        albumId
      );
      const snapshots = await getDocs(ref);
      const data = snapshots.docs.map((snapshot) => {
        const data = snapshot.data();
        return {
          id: snapshot.id,
          ...data,
          createdAt: data.createdAt.toDate(),
        };
      });
      data.reverse();
      return data;
    })
  );

  data.reverse();

  return data as {
    location: {
      latitude: number;
      longitude: number;
    };
    id: string;
    downloadUrl: string;
    location_name: string;
    createdAt: Date;
  }[][];
};

export const getAlbum = async (groupId: string, albumId: string) => {
  const ref = collection(
    db,
    "group",
    groupId,
    "grouping_photo",
    albumId,
    albumId
  );
  const snapshots = await getDocs(ref);
  const data = snapshots.docs.map((snapshot) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      createdAt: data.createdAt.toDate(),
    };
  });
  return data as {
    location: {
      latitude: number;
      longitude: number;
    };
    id: string;
    downloadUrl: string;
    location_name: string;
    createdAt: Date;
  }[];
};
