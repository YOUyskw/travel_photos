"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Camera, CameraProps } from "react-camera-pro";

export default function Page() {
  const camera =
    useRef<
      React.ForwardRefExoticComponent<
        CameraProps & React.RefAttributes<unknown>
      >
    >(null);
  const [image, setImage] = useState("");
  return (
    <>
      <Camera
        ref={camera}
        errorMessages={{
          noCameraAccessible: undefined,
          permissionDenied: undefined,
          switchCamera: undefined,
          canvas: undefined,
        }}
      />
      <button onClick={() => setImage(camera.current?.takePhoto())}>
        Take photo
      </button>
      <Image src={image} alt="Taken photo" />
    </>
  );
}
