"use client";
import Header from "@/components/Header";
import { createGroup } from "@/repo/group";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/provider/AuthStateProvider";

export default function Page() {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const user = useUser();
  const [errorMessage, setErrorMessage] = useState("");
  if (!user)
    return (
      <>
        <Header />
        <div className="alert alert-warning shadow-lg mt-[64px]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0 w-6 h-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>もう一度、ログインをやり直してください</span>
          </div>
        </div>
      </>
    );
  return (
    <div>
      <Header />
      <div className="mx-5 mt-10">
        <h2 className="pt-[64px] text-xl font-bold">
          新しい旅行グループを作成
        </h2>
        <hr className="w-[calc(100%+40px)] my-4 -translate-x-[20px]" />
        <p className="mt-6 mb-2">旅行の名前</p>
        <div className="flex flex-col">
          <input
            ref={input}
            type="text"
            placeholder="例）北海道旅行 いつめん卒業旅行 etc..."
            className="w-full max-w-xs mb-10 input input-bordered"
          />
          <button
            className="btn btn-error"
            onClick={async () => {
              if (input.current?.value) {
                const groupId = await createGroup(
                  input.current?.value,
                  user.uid
                );
                router.push(`/group/${groupId}/camera`);
              } else {
                setErrorMessage("入力名が空欄です。");
              }
            }}
          >
            完了
          </button>
          {errorMessage && (
            <div className="fixed inset-x-0 shadow-lg alert alert-error top-32">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 stroke-current"
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
