import Header from "@/components/Header";
import Image from "next/image";
import { getGroup } from "@/repo/group";
import { FiShare } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";
import Link from "next/link";
import { getAlbums } from "@/repo/album";

type PageProps = {
  params: { groupId: string };
};

// 日付フォーマット
function DateTransformer(date: Date) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedDate = `${month < 10 ? "0" : ""}${month}/${
    day < 10 ? "0" : ""
  }${day} ${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
  return formattedDate;
}

// 写真の総枚数カウント
function countPhotos(albums: any[]) {
  let count = 0;
  for (var i = 0; i < albums.length; i++) {
    for (var j = 0; j < albums[i].length; j++) {
      count++;
    }
  }
  return count;
}

export default async function Page({ params: { groupId } }: PageProps) {
  const group = await getGroup(groupId);
  const albums = await getAlbums(groupId);

  return (
    <>
      <Header />
      <main className="m-6 mt-20">
        <div className="relative mt-5">
          <div>
            <p className="text-2xl font-bold">{group.name}</p>
            <p className="text-zinc-400">
              {countPhotos(albums)}枚の写真・{group.users.length}
              人のメンバー
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
          className="mb-2"
        />

        {/* mapでループさせる */}
        {/* 時間ごとの塊 */}
        {albums.map((segment_album, index) => (
          <div
            key={index}
            className="px-2  bg-[url('../../public/timeline_border2.png')] bg-cover"
          >
            {/* 場所と時間 */}
            <div className="relative py-1 ml-10">
              {/* とりあえず1枚目の画像の情報を流用 */}

              <p className="text-zinc-400">
                {DateTransformer(segment_album[0].createdAt)}
              </p>
              <p className="">{segment_album[0].location_name} 付近</p>
              <Link
                href={`./group/${groupId}/${index}`}
                className="absolute top-5 right-2"
              >
                <AiOutlineArrowRight />
              </Link>
            </div>

            <div className="flex py-3 ml-5 overflow-auto flex-nowrap w-[calc(100%+64px)] -translate-x-[52px]">
              {segment_album.map((photo, photo_index) => (
                <Link
                  key={photo_index}
                  className="mx-2 mb-5 shrink-0 first:pl-[64px] last:pr-[32px]"
                  href={`/group/${groupId}/photo/${photo.id}`}
                >
                  <Image
                    src={photo.downloadUrl}
                    alt=""
                    width={64}
                    height={48}
                    className="block object-cover w-64 h-48 rounded-md"
                  />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* カメラへのリンク */}
        <div className="sticky bottom-0 text-white">
          <Link
            href={`/group/${groupId}/camera`}
            className="absolute right-0 p-2 text-5xl bg-orange-400 border border-orange-400 rounded-full shadow-lg bottom-5"
          >
            <AiOutlineCamera />
          </Link>
        </div>
      </main>
    </>
  );
}
