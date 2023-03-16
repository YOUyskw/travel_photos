import Header from "@/components/Header";
import { getGroup } from "@/repo/group";
import { FiShare } from "react-icons/fi";

type PageProps = {
  params: { groupId: string };
};

export default async function Page({ params: { groupId } }: PageProps) {
  const group = await getGroup(groupId);

  return (
    <>
      <Header />
      <main className="m-6 mt-20">
        <div className="relative my-5">
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

        <hr />

        {/* 時間ごとの塊 */}
        <div className="px-5  bg-[url('../../public/timeline_border.png')] bg-cover mt-5">
          {/* 場所と時間 */}
          <div className="py-1 mx-10">
            <p className="text-zinc-400">3/10 18:00</p>
            <p className="">北九州市小倉北区馬借 付近</p>
          </div>
          {/* 写真 */}
          <div className="flex py-5 ml-5 overflow-auto flex-nowrap">
            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                alt="cute dog"
                className="block object-cover w-64 h-48"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://image.hldy-cdn.com/c/w=1336,h=826,g=5,a=2,r=auto,f=webp:auto/holiday_article_images/4709/4709.jpg?1592537784"
                alt="kiyomizu"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000423/img/basic/a2000423_main.jpg?20201203161217&q=80"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://photo-map.net/wp-content/uploads/2019/10/s_shutterstock_1402684670.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://resize2-icotto.k-img.com/ikCOVnqBypZZTR7HaWd9ZOgmktSji7OvZeF0UJlrCtI/rs:fill:700:467/plain/https://icotto.k-img.com/system/press_images/001/000/856/86999f0644e4cff69a163f96666828538b3486f2.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>
          </div>
        </div>

        {/* 時間ごとの塊 */}
        <div className="px-5  bg-[url('../../public/timeline_border.png')] bg-cover">
          {/* 場所と時間 */}
          <div className="py-1 mx-10">
            <p className="text-zinc-400">3/10 18:00</p>
            <p className="">北九州市小倉北区馬借 付近</p>
          </div>
          {/* 写真 */}
          <div className="flex py-5 ml-5 overflow-auto flex-nowrap">
            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                alt="cute dog"
                className="block object-cover w-64 h-48"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://image.hldy-cdn.com/c/w=1336,h=826,g=5,a=2,r=auto,f=webp:auto/holiday_article_images/4709/4709.jpg?1592537784"
                alt="kiyomizu"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000423/img/basic/a2000423_main.jpg?20201203161217&q=80"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://photo-map.net/wp-content/uploads/2019/10/s_shutterstock_1402684670.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://resize2-icotto.k-img.com/ikCOVnqBypZZTR7HaWd9ZOgmktSji7OvZeF0UJlrCtI/rs:fill:700:467/plain/https://icotto.k-img.com/system/press_images/001/000/856/86999f0644e4cff69a163f96666828538b3486f2.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
