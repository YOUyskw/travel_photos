"use client";
import { useUser } from "@/provider/AuthStateProvider";
import { savePhoto } from "@/repo/photo";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";

export default function Page({ params }: { params: { groupId: string } }) {
  const camera = useRef<CameraType>(null);
  const user = useUser();

  return (
    <div>
      <Camera
        ref={camera}
        errorMessages={{
          noCameraAccessible: undefined,
          permissionDenied: undefined,
          switchCamera: undefined,
          canvas: undefined,
        }}
      />
      <div className="fixed bottom-0 flex items-center justify-center w-full bg-black">
        <Link
          href={`/group/${params.groupId}/home`}
          className="left-0.5 text-white basis-1/4 mr-3"
        >
          キャンセル
        </Link>
        <div className="z-20 flex justify-center w-24 h-24 my-2 bg-white border border-black rounded-full">
          <button
            onClick={() => {
              if (!camera.current || user == null) return;
              const image = camera.current?.takePhoto();
              const groupId = params.groupId;
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  savePhoto({
                    image: image,
                    createdBy: user.uid,
                    location: {
                      longitude: position.coords.longitude,
                      latitude: position.coords.latitude,
                    },
                    groupId: groupId,
                    address: "",
                  });
                });
              } else {
                savePhoto({
                  image: image,
                  createdBy: user.uid,
                  location: { latitude: 0, longitude: 0 },
                  groupId: groupId,
                  address: "",
                });
              }
            }}
            className="z-20 w-20 h-20 my-auto bg-white border-2 border-black rounded-full active:bg-gray-400"
          />
        </div>
        <div className="basis-1/4" />
      </div>
    </div>
  );
}
