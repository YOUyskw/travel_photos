"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { getPhoto } from "@/repo/photo";
import { useEffect, useState } from "react";

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    getPhoto("WUlZOnCsufIYp2z1p0ok", "0CdP_25P6Agek2w31ZK5N").then((res) => {
      setImageUrl(res.downloadUrl);
    });
  });
  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h1>home</h1>
      </div>
      <h1 className="pt-10 pb-2 font-bold mx-2">過去のグループ一覧</h1>
      <h2 className="mx-2 pt-2 font-bold border-t-2">グループA</h2>
      <div className="overflow-x-scroll flex">
        <div className="relative shrink-0">
          <Image
            src={imageUrl}
            alt="not found"
            width="414"
            height="896"
            className="rounded-3xl"
          />
          <div className="absolute top-6 left-6 text-4xl w-full right-6">
            11月2日
          </div>
        </div>
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
      </div>
      <h2 className="mx-2 pt-2 font-bold border-t-2">グループB</h2>
      <div className="overflow-x-scroll flex">
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
      </div>
      <h2 className="mx-2 pt-2 font-bold border-t-2">グループC</h2>
      <div className="overflow-x-scroll flex">
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
        <Image
          src="/IMG_4422.jpeg"
          alt="not found"
          width="414"
          height="896"
          className="p-4 rounded-3xl"
        />
      </div>
    </>
  );
}
