"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { getPhoto } from "@/repo/photo";
import { useUser } from "@/provider/AuthStateProvider";
import { useEffect, useState } from "react";
import { getGroupLatestPhoto, getGroups } from "../../repo/group";
import useSWR from "swr";
import { getAlbum } from "@/repo/album";
import { group } from "console";
import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";

export default function Page() {
  const user = useUser();
  const { data: groups } = useSWR("user.uid", () => {
    return getGroups(user ? user.uid : "");
  });
  console.log("start");
  const { data: photos, error } = useSWR(
    groups == null ? null : ["group", groups],
    async () => {
      if (!groups) return;
      const res = await getGroupLatestPhoto("4xGsmi3DUTHRbuQ9y3CA");
      return Promise.all(
        groups.map(async (group) => {
          const photo = await getGroupLatestPhoto(group.id);
          return { name: group.name, photo };
        })
      );
    }
  );
  console.log(error);
  return (
    <>
      <Header />
      <div className="pt-[64px]">
        <h1>home</h1>
      </div>
      <h1 className="pt-10 pb-2 font-bold mx-2">過去のグループ一覧</h1>
      {photos &&
        photos?.map((photo, idx) => {
          if (!photo.photo) return;
          return (
            <div key={idx}>
              <h2 className="mx-2 pt-2 font-bold border-t-2">{photo.name}</h2>
              <div className="relative">
                <Image
                  src={photo.photo.downloadUrl}
                  alt="not found"
                  width="414"
                  height="896"
                  className="rounded-3xl"
                />
                <div className="absolute top-6 left-6 text-4xl w-full right-6">
                  {photo.photo.createdAt.toDateString()}
                </div>
              </div>
            </div>
          );
        })}
      <Link
        href={`/create`}
        className="fixed text-white text-5xl bottom-5 right-8 rounded-full border-orange-500 border p-2 bg-orange-500"
      >
        <AiFillPlusCircle />
      </Link>
    </>
  );
}
