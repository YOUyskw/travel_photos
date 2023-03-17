import Header from "@/components/Header";
import Image from "next/image";
import { getGroup } from "@/repo/group";
import { DUMMY_ALBUMS } from "@/repo/dummy"
import { FiShare } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai"
import { AiOutlineCamera } from "react-icons/ai"
import Link from 'next/link';

type PageProps = {
  params: { groupId: string };
};

export default async function Page({ params: { groupId } }: PageProps) {
  const group = await getGroup(groupId);

  return (
    <>
      <Header />
      <main className="m-6 mt-20">
        <div className="relative mt-5">
          <div>
            <p className="text-2xl font-bold">{group.name}</p>
            <p className="text-zinc-400">
              ?枚の写真・{group.users.length}人のメンバー
            </p>
          </div>
          <div className="absolute top-5 right-5">
            <FiShare />
          </div>
        </div>
        <div className="flex mt-2 mb-2 -space-x-2 border rounded-full border-zinc-300 w-max">
          {group.users.map((user) => {
            return (
              <div key={user.iconUrl}>
                <Image
                  alt=""
                  src={user.iconUrl}
                  width={32}
                  height={32}
                  className="border-2 border-white rounded-full"
                />
              </div>
            );
          })}
        </div>

        <hr
          style={{ width: `calc(100% + 48px)`, transform: "translateX(-24px)" }}
        />

        {/* mapでループさせる */}
        {/* 時間ごとの塊 */}
        {DUMMY_ALBUMS.map((segment_album) => 
          <div className="px-5  bg-[url('../../public/timeline_border.png')] bg-cover mt-5">
            {/* 場所と時間 */}
            <div className="py-1 mx-10">
              {/* とりあえず1枚目の画像の情報を流用 */}

              <p className="text-zinc-400">{segment_album[0].date}</p>
              <p className="">{segment_album[0].location} 付近</p>
              <a href="./2" className="absolute top-5 right-0">
                  <AiOutlineArrowRight />
              </a>
            </div>
            
            
            

            <div className="flex py-5 ml-5 overflow-auto flex-nowrap">
              {segment_album.map(
                (photo) =>
                
                <div className="mx-5 mb-5 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.location}
                    className="block object-cover w-64 h-48 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          )}
        

        

        {/* カメラへのリンク */}
        <div className="sticky bottom-0 text-white">
          <Link href={`/group/${groupId}/camera`} className="text-5xl absolute bottom-5 right-5 rounded-full border-orange-500 border p-2 bg-orange-500"><AiOutlineCamera /></Link>
        </div>
      </main>
    </>
  );
}
