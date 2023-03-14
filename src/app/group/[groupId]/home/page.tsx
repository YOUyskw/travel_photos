export default function Page() {
  return (
    <>
      <div>
        <main className="m-20">
          <div class="my-5">
            <p className="font-bold text-2xl">行った場所 + 付近</p>
            <p className="text-zinc-500">日付 + 時間 + ?枚の写真</p>
          </div>
          <div className="flex flex-wrap">
            <div>
              <img
                src="https://images.dog.ceo/breeds/shiba/shiba-8.jpg"
                alt="cute dog"
                className="object-cover h-48 w-48 block"
              />
            </div>
            
            <div>
              <img
                src="https://image.hldy-cdn.com/c/w=1336,h=826,g=5,a=2,r=auto,f=webp:auto/holiday_article_images/4709/4709.jpg?1592537784"
                alt="kiyomizu"
                className="object-cover h-48 w-48 block"
              />
            </div>

            <div>
              <img
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/20/00/a2000423/img/basic/a2000423_main.jpg?20201203161217&q=80"
                alt="kyoto"
                className="object-cover h-48 w-48 block"
              />
            </div> 

            <div>
              <img
                src="https://photo-map.net/wp-content/uploads/2019/10/s_shutterstock_1402684670.jpg"
                alt="kyoto"
                className="object-cover h-48 w-48 block"
              />
            </div> 

            <div>
              <img
                src="https://resize2-icotto.k-img.com/ikCOVnqBypZZTR7HaWd9ZOgmktSji7OvZeF0UJlrCtI/rs:fill:700:467/plain/https://icotto.k-img.com/system/press_images/001/000/856/86999f0644e4cff69a163f96666828538b3486f2.jpg"
                alt="kyoto"
                className="object-cover h-48 w-48 block"
              />
            </div> 
          </div>
        </main>
      </div>
    </>
  );
}
