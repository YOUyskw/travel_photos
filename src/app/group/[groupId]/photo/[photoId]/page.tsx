import Header from "@/components/Header";
import { getPhoto } from "@/repo/photo";

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
      <div className="relative w-full max-w-lg pt-16 mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.downloadUrl} alt="" className="w-full" />
        <div className="p-2 text-right text-gray-400">
          {photo.createdAt.toISOString().slice(0, 10).split("-").join("/")}{" "}
          {photo.createdAt.toISOString().slice(11, 16).split("-").join("/")}・
          {photo.createdBy.name}
        </div>
      </div>
    </>
  );
}
