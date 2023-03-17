"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { useUser } from "@/provider/AuthStateProvider";
import { getGroupLatestPhoto, getGroups } from "../../repo/group";
import useSWR from "swr";
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Page() {
  const user = useUser();
  const { data: groups } = useSWR("user.uid", () => {
    return getGroups(user ? user.uid : "");
  });
  const { data: photos, error } = useSWR(
    groups == null ? null : ["group", groups],
    async () => {
      if (!groups) return;
      const res = await getGroupLatestPhoto("4xGsmi3DUTHRbuQ9y3CA");
      return Promise.all(
        groups.map(async (group) => {
          const photo = await getGroupLatestPhoto(group.id);
          return { groupName: group.name, groupId: group.id, photo };
        })
      );
    }
  );
  return (
    <>
      <Header />
      <div className="mx-3 mt-[64px]">
        <h1 className="pt-5 pb-2 font-bold mx-2 border-b-2 text-xl">
          過去のグループ一覧
        </h1>
        {photos &&
          photos?.map((photo, idx) => {
            if (!photo.photo) return;
            return (
              <Link href={`group/${photo.groupId}/home`} key={idx}>
                <h2 className="mx-2 py-2 font-bold">{photo.groupName}</h2>
                <div className="relative">
                  <Image
                    src={photo.photo.downloadUrl}
                    alt="not found"
                    width="380"
                    height="380"
                    className="rounded-3xl mb-2 aspect-square object-cover"
                  />
                  <div className="absolute top-6 left-6 text-4xl right-6">
                    {photo.photo.createdAt.toDateString()}
                  </div>
                </div>
              </Link>
            );
          })}
        <Link
          href={`/create`}
          className="fixed text-white text-5xl bottom-5 right-8 rounded-full border-orange-500 border p-2 bg-orange-500"
        >
          <AiFillPlusCircle />
        </Link>
      </div>
    </>
  );
}
