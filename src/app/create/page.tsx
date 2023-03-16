"use client";
import Header from "@/components/Header";
import { createGroup } from "@/repo/group";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { async } from "@firebase/util";

export default function Page() {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      <Header />
      <div className="mx-5">
        <h2 className="pt-[64px] pb-5 border-b-4 mb-10">
          新しい旅行グループを作成
        </h2>
        <p className="mb-10">グループ名</p>
        <div className="flex flex-col">
          <input
            ref={input}
            type="text"
            placeholder="グループ名を入力してください"
            className="input input-bordered w-full max-w-xs mb-10"
          />
          <button
            className="btn btn-error"
            onClick={async () => {
              if (input.current?.value) {
                const groupId = await createGroup(input.current?.value, "");
                router.push(`/group/${groupId}/camera`);
              } else {
                setErrorMessage("入力名が空欄です。");
              }
            }}
          >
            完了
          </button>
          {errorMessage && (
            <div className="alert alert-error shadow-lg fixed inset-x-0 top-5">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current flex-shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
