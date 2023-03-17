import { FiShare } from "react-icons/fi";
import Header from "@/components/Header";
import { AiOutlineArrowRight } from "react-icons/ai"
import { AiOutlineCamera } from "react-icons/ai"

export default function Page() {

  return (
    <>
      <Header />
      <div className="mx-6 my-24">
        <div className="relative my-5">
          <div>
            <p className="text-2xl font-bold">グループ名をここに</p>
            <p className="text-zinc-500">?枚の写真・?人のメンバー</p>
          </div>
          <div className="absolute top-5 right-20">
            <FiShare />
          </div>
        </div>

        {/* 時間ごとの塊 */}
        <div className="px-20  bg-[url('../../public/timeline_border.png')] bg-cover">
          {/* 場所と時間 */}
          <div className="py-1 mx-10 relative">
            <p className="text-zinc-500">日付 + 時間</p>
            <p className="text-2xl font-bold">行った場所 + 付近</p>
            <a href="./1" className="absolute top-5 right-0">
              <AiOutlineArrowRight />
            </a>
          </div>
          {/* 写真 */}
          <div className="flex py-5 ml-5 overflow-auto flex-nowrap">
            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                alt="cute dog"
                className="block object-cover w-64 h-48"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://image.hldy-cdn.com/c/w=1336,h=826,g=5,a=2,r=auto,f=webp:auto/holiday_article_images/4709/4709.jpg?1592537784"
                alt="kiyomizu"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000423/img/basic/a2000423_main.jpg?20201203161217&q=80"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://photo-map.net/wp-content/uploads/2019/10/s_shutterstock_1402684670.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://resize2-icotto.k-img.com/ikCOVnqBypZZTR7HaWd9ZOgmktSji7OvZeF0UJlrCtI/rs:fill:700:467/plain/https://icotto.k-img.com/system/press_images/001/000/856/86999f0644e4cff69a163f96666828538b3486f2.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>
          </div>
        </div>

        {/* 時間ごとの塊 */}
        <div className="px-20  bg-[url('../../public/timeline_border.png')] bg-cover">
          {/* 場所と時間 */}
           <div className="py-1 mx-10 relative">
              <p className="text-zinc-500">日付 + 時間</p>
              <p className="text-2xl font-bold">行った場所 + 付近</p>
              <a href="./2" className="absolute top-5 right-0">
                <AiOutlineArrowRight />
              </a>
            </div>
          {/* 写真 */}
          <div className="flex py-3 ml-5 overflow-auto flex-nowrap">
            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                alt="cute dog"
                className="block object-cover w-64 h-48"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://image.hldy-cdn.com/c/w=1336,h=826,g=5,a=2,r=auto,f=webp:auto/holiday_article_images/4709/4709.jpg?1592537784"
                alt="kiyomizu"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000423/img/basic/a2000423_main.jpg?20201203161217&q=80"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://photo-map.net/wp-content/uploads/2019/10/s_shutterstock_1402684670.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>

            <div className="mx-5 mb-5 shrink-0">
              <img
                src="https://resize2-icotto.k-img.com/ikCOVnqBypZZTR7HaWd9ZOgmktSji7OvZeF0UJlrCtI/rs:fill:700:467/plain/https://icotto.k-img.com/system/press_images/001/000/856/86999f0644e4cff69a163f96666828538b3486f2.jpg"
                alt="kyoto"
                className="block object-cover w-64 h-48 shrink-0"
              />
            </div>
          </div>
        </div>

        {/* カメラへのリンク */}
        <div className="sticky bottom-0 text-white">
          <a href="./camera" className="text-5xl absolute bottom-5 right-20 rounded-full border-orange-500 border p-2 bg-orange-500"><AiOutlineCamera /></a>
        </div>

        
      </div>
    </>
  );
}
