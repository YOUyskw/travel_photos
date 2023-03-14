"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Camera, CameraProps, CameraType } from "react-camera-pro";

export default function Page() {
  const camera = useRef<CameraType>(null);
  const [image, setImage] = useState<string>("");
  return (
    <>
      <Camera
        ref={camera}
        aspectRatio="cover"
        errorMessages={{
          noCameraAccessible: undefined,
          permissionDenied: undefined,
          switchCamera: undefined,
          canvas: undefined,
        }}
      />
      <button
        onClick={() => {
          if (camera.current) {
            setImage(camera.current?.takePhoto());
          }
        }}
      >
        Take photo
      </button>
      <Image src={image} alt="Taken photo" />
    </>
  );
}
