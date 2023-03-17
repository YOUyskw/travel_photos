import Header from "@/components/Header";
import { getAlbum } from "@/repo/album";
import Image from "next/image";
import Link from "next/link";

// 日付フォーマット
function DateTransformer(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month}/${day} ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return formattedDate;
}

type PageProps = {
  params: { groupId: string; albumId: string };
};

export default async function Page({
  params: { groupId, albumId },
}: PageProps) {
  const album = await getAlbum(groupId, albumId);

  return (
    <>
      <Header />
      <div className="mt-20">
        <main className="m-4">
          <div className="my-5">
            <p className="font-bold">{album[0].location_name}</p>
            <p className="text-zinc-400">
              {DateTransformer(album[0].createdAt)}・{album.length}枚の写真
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {album.map((photo) => (
              <Link key={photo.id} href={`/group/${groupId}/photo/${photo.id}`}>
                <div className="relative aspect-square" key={photo.id}>
                  <Image
                    src={photo.downloadUrl}
                    alt="cute dog"
                    className="block object-cover w-48 h-48 bg-gray-100"
                    fill
                  />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
