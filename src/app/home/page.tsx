"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { useUser } from "@/provider/AuthStateProvider";
import { getGroupLatestPhoto, getGroups } from "../../repo/group";
import useSWR from "swr";
import { MdAirplaneTicket } from "react-icons/md";
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Page() {
  const user = useUser();
  const { data: groups } = useSWR("user.uid", () => {
    return getGroups(user ? user.uid : "");
  });
  const { data: photos } = useSWR(
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
      <Header hideBack />
      <div className="mt-[64px] px-3 flex flex-col w-full">
        <h1 className="pb-2 mx-2 mt-10 text-2xl font-bold">旅行の思い出</h1>
        <hr className="w-[calc(100%+24px)] -translate-x-3 my-2" />
        {photos &&
          photos?.map((photo, idx) => {
            if (!photo.photo) return;
            return (
              <Link
                href={`group/${photo.groupId}/home`}
                key={idx}
                className="w-full mb-8 group"
              >
                <h2 className="py-2 mx-2 text-xl font-bold">
                  ✈️ {photo.groupName}
                </h2>
                <div className="relative overflow-hidden transition shadow-md aspect-square rounded-2xl group-active:scale-95 group-active:shadow-none">
                  <Image
                    src={photo.photo.downloadUrl}
                    alt=""
                    fill
                    className="object-cover mb-2"
                  />
                  <div
                    className="absolute text-3xl font-bold text-white top-6 left-6 right-6"
                    style={{ textShadow: "black 1px 0 10px" }}
                  >
                    {photo.photo.createdAt.toDateString()}
                  </div>
                </div>
              </Link>
            );
          })}
        <Link
          href={`/create`}
          className="fixed p-2 text-5xl text-white bg-orange-500 border border-orange-500 rounded-full bottom-5 right-8"
        >
          <AiFillPlusCircle />
        </Link>
      </div>
    </>
  );
}
