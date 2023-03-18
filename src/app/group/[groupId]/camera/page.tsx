"use client";
import { useUser } from "@/provider/AuthStateProvider";
import { savePhoto } from "@/repo/photo";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { MdOutlineCameraswitch } from "react-icons/md";

export default function Page({ params }: { params: { groupId: string } }) {
  const camera = useRef<CameraType>(null);
  const user = useUser();
  const [showOverlay, setShowOverlay] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewShriked, setPreviewShrinked] = useState<boolean>(false);
  const previewTimer = useRef<NodeJS.Timeout | null>(null);

  function handlePictureButtonClick() {
    setShowOverlay(false);
    setTimeout(() => setShowOverlay(true), 100); // set the delay time (in milliseconds) to adjust how long the black screen appears
    previewTimer.current = setTimeout(() => {
      setPreviewShrinked(false);
      setPreview(null);
    }, 3000);
  }
  const playShutterSound = () => {
    const audio = new Audio("/shutter-sound.mp3");
    audio.play();
  };

  return (
    <div className="bg-black">
      {showOverlay && (
        <Camera
          ref={camera}
          facingMode="environment"
          errorMessages={{
            noCameraAccessible: undefined,
            permissionDenied: undefined,
            switchCamera: undefined,
            canvas: undefined,
          }}
        />
      )}
      {preview != null && (
        <div
          className={
            "absolute border-2 border-white/50 overflow-hidden transition-all " +
            (previewShriked
              ? "right-3 w-[64px] bottom-[120px] rounded"
              : "inset-8 rounded-xl")
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" />
        </div>
      )}
      <div className="fixed bottom-0 flex items-center justify-center w-full px-2 bg-black">
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

              setPreview(image);
              setPreviewShrinked(false);
              if (previewTimer.current != null)
                clearTimeout(previewTimer.current);
              setTimeout(() => setPreviewShrinked(true), 1000);
              playShutterSound();
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
              handlePictureButtonClick();
            }}
            className="z-20 w-20 h-20 my-auto bg-white border-2 border-black rounded-full active:bg-gray-400"
          />
        </div>
        <button
          className="flex justify-center pl-8 basis-1/4"
          onClick={() => {
            camera.current?.switchCamera();
          }}
        >
          <MdOutlineCameraswitch className="text-3xl text-white/50" />
        </button>
      </div>
    </div>
  );
}
