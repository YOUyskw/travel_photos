"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useCallback } from "react";

const googleProvider = new GoogleAuthProvider();

export default function Page() {
  const login = useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="mt-[160px] text-2xl font-bold">Trip Timeline</h1>
      <button
        onClick={login}
        className="fixed py-2 text-sm normal-case border border-gray-200 rounded-full btn border-rounded bottom-10 inset-x-10"
      >
        Googleでログイン
      </button>
    </div>
  );
}
