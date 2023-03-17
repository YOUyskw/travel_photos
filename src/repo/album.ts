import { DUMMY_ALBUMS } from "./dummy";

/**
 * あるグループが持つアルバムの一覧を取得する
 */
export const getAlbums = (
  groupId: string
): {
  gps: {
    latitude: number;
    longitude: number;
  };
  date: string;
  id: string;
  url: string;
  location: string;
}[][] => {
  return DUMMY_ALBUMS;
};

export const getAlbum = async (groupId: string, albumId: string) => {
  return DUMMY_ALBUMS[parseInt(albumId, 10)];
};
