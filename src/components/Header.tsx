"use client";

import { useUser } from "@/provider/AuthStateProvider";
import React from "react";
import Image from "next/image";
import { FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useScrollUI } from "@/lib/useScroll";
import Link from "next/link";

const Header: React.FC = () => {
  const router = useRouter();

  const user = useUser();

  const logOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const showHeader = useScrollUI();

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-30 flex items-center justify-between bg-white transition-all " +
        (!showHeader ? "shadow-header h-12" : "h-16")
      }
    >
      <button className="p-4" onClick={() => router.back()}>
        <FiChevronLeft size={24} />
      </button>
      <Link href="/home">Travel Timeline</Link>
      {user != null && (
        <div className="m-4 dropdown dropdown-bottom dropdown-end">
          <label tabIndex={0} className="cursor-pointer hover:opacity-80">
            <Image
              src={user.photoURL as string}
              alt={user.displayName as string}
              width={32}
              height={32}
              className="overflow-hidden rounded-full"
            />
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
          >
            <li className="p-4 text-sm text-center text-gray-500">
              {user.displayName}
            </li>
            <li>
              <button className="text-red-500" onClick={logOut}>
                ログアウト
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
