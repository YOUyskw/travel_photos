import Header from "@/components/Header";
import { getAlbum } from "@/repo/album";
import Image from "next/image";

type PageProps = {
  params: { groupId: string; albumId: string };
};

export default async function Page({
  params: { groupId, albumId },
}: PageProps) {
  const alubm = await getAlbum(groupId, albumId);

  return (
    <>
      <Header />
      <div className="mt-20">
        <main className="m-4">
          <div className="my-5">
            <p className="font-bold">北九州市小倉北区馬借 付近</p>
            <p className="text-zinc-400">3/10 18:00 ・ 36枚の写真</p>
          </div>
          <div className="grid grid-cols-3 gap-1">
            {alubm.map((photo) => (
              <div className="relative aspect-square" key={photo.id}>
                <Image
                  src={photo.url}
                  alt="cute dog"
                  className="block object-cover w-48 h-48 bg-gray-100"
                  fill
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
