import Header from "@/components/Header";
import { getPhoto } from "@/repo/photo";
import Image from "next/image";

type PhotoDetailProps = {
  params: {
    groupId: string;
    photoId: string;
  };
};

export default async function Page({
  params: { groupId, photoId },
}: PhotoDetailProps) {
  const photo = await getPhoto(groupId, photoId);

  return (
    <>
      <Header />
      <div className="w-full max-w-lg pt-16 mx-auto">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden opacity-50 -z-10">
            <Image src={photo.downloadUrl} alt="" fill className="blur-2xl" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.downloadUrl}
            alt=""
            className="w-full object-contain max-h-[70vh] z-10 min-h-[400px]"
          />
        </div>
        <div className="p-2 text-right text-gray-400">
          {photo.createdAt.toISOString().slice(0, 10).split("-").join("/")}{" "}
          {photo.createdAt.toISOString().slice(11, 16).split("-").join("/")}・
          {photo.createdBy.name}
        </div>
      </div>
    </>
  );
}
