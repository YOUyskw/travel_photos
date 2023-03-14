"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Camera, CameraProps, CameraType } from "react-camera-pro";

export default function Page() {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string>("");
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
      <div className="fixed flex justify-center bg-black bottom-0 w-full">
        <div className="w-24 h-24 z-20 rounded-full border border-black bg-white flex justify-center my-2">
          <button
            onClick={() => {
              if (camera.current) {
                setImage(camera.current?.takePhoto());
              }
            }}
            className="z-20 h-20 w-20 rounded-full border-black border-2 bg-white my-auto"
          />
        </div>
      </div>
      <Image
        className="z-20"
        src={image}
        alt="Taken photo"
        width={20}
        height={20}
      />
    </div>
  );
}
