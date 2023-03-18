"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

const GROUPING_API_ENDPOINT = process.env.NEXT_PUBLIC_GROUPING_API_ENDPOINT;

export type DeduplicateButtonProps = {
  groupId: string;
};

const DeduplicateButton: React.FC<DeduplicateButtonProps> = ({ groupId }) => {
  const router = useRouter();

  return (
    <div className="m-4 dropdown dropdown-bottom dropdown-end">
      <label
        tabIndex={0}
        className="block p-2 ml-auto transition rounded-full cursor-pointer active:scale-90 bg-white/30 backdrop-blur"
      >
        <FiMoreHorizontal />
      </label>
      <ul
        tabIndex={0}
        className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            onClick={async () => {
              await fetch(
                `${GROUPING_API_ENDPOINT}/deduplicate?group_id=${groupId}`
              );
              router.refresh();
            }}
          >
            重複を排除
          </button>
        </li>
      </ul>
    </div>
  );
};

export default DeduplicateButton;
