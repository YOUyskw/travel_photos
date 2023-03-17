"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { getPhoto } from "@/repo/photo";
import { useUser } from "@/provider/AuthStateProvider";
import { useEffect, useState } from "react";
import { getGroups } from "../../repo/group";

export default function Page() {
  const user = useUser();
  const [imageUrl, setImageUrl] = useState("");
  const [imageDate, setImageDate] = useState(new Date());
  const [groups, setGroups] = useState<
    {
      name: string;
      createdAt: Date;
      users: {
        name: string;
        iconUrl: string;
      }[];
    }[]
  >([]);
  useEffect(() => {
    getGroups(user ? user.uid : "").then((group) => {
      console.log(group.length);
      setGroups(group);
    });
  }, [user]);

  useEffect(() => {
    groups.map((group) => {
      getPhoto("WUlZOnCsufIYp2z1p0ok", "0CdP_25P6Agek2w31ZK5N").then((res) => {
        setImageUrl(res.downloadUrl);
        setImageDate(res.createdAt);
      });
    });
  }, [groups]);
  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h1>home</h1>
      </div>
      {groups.map((group) => {
        return (
          <>
            <h2 className="mx-2 pt-2 font-bold border-t-2">{group?.name}</h2>
            <div className="relative">
              <Image
                src={imageUrl}
                alt="not found"
                width="414"
                height="896"
                className="rounded-3xl"
              />
              <div className="absolute top-6 left-6 text-4xl w-full right-6">
                {imageDate.toDateString()}
              </div>
            </div>
          </>
        );
      })}
      <h1 className="pt-10 pb-2 font-bold mx-2">過去のグループ一覧</h1>
      <h2 className="mx-2 pt-2 font-bold border-t-2">{groups[0]?.name}</h2>
      <div className="relative">
        <Image
          src={imageUrl}
          alt="not found"
          width="414"
          height="896"
          className="rounded-3xl"
        />
        <div className="absolute top-6 left-6 text-4xl w-full right-6">
          {imageDate.toDateString()}
        </div>
      </div>
      <h2 className="mx-2 pt-2 font-bold border-t-2">グループB</h2>
      <div className="relative">
        <Image
          src={imageUrl}
          alt="not found"
          width="414"
          height="896"
          className="rounded-3xl"
        />
        <div className="absolute top-6 left-6 text-4xl w-full right-6">
          {imageDate.toDateString()}
        </div>
      </div>
      <h2 className="mx-2 pt-2 font-bold border-t-2">グループC</h2>
      <div className="relative">
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
    </>
  );
}
