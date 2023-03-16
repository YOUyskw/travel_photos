"use client";
import { savePhoto } from "@/repo/photo";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";

export default function Page({ params }: { params: { groupId: string } }) {
  const camera = useRef<CameraType>(null);
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
      <div className="fixed flex justify-center items-center bg-black bottom-0 w-full">
        <Link
          href={`/group/${params.groupId}/home`}
          className="left-0.5 text-white basis-1/4 mr-3"
        >
          キャンセル
        </Link>
        <div className="w-24 h-24 z-20 rounded-full border border-black bg-white flex justify-center my-2">
          <button
            onClick={() => {
              if (camera.current) {
                const image = camera.current?.takePhoto();
                const groupId = params.groupId;
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition((position) => {
                    savePhoto({
                      image: image,
                      createdBy: "",
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
                    createdBy: "",
                    location: { latitude: 0, longitude: 0 },
                    groupId: groupId,
                    address: "",
                  });
                }
              }
            }}
            className="z-20 h-20 w-20 rounded-full border-black border-2 bg-white my-auto"
          />
        </div>
        <div className="basis-1/4" />
      </div>
    </div>
  );
}
