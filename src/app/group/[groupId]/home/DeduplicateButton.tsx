"use client";

import { useRouter } from "next/navigation";
import React from "react";

const GROUPING_API_ENDPOINT = process.env.NEXT_PUBLIC_GROUPING_API_ENDPOINT;

export type DeduplicateButtonProps = {
  groupId: string;
};

const DeduplicateButton: React.FC<DeduplicateButtonProps> = ({ groupId }) => {
  const router = useRouter();
  return (
    <button
      className="ml-auto transition active:scale-90"
      onClick={async () => {
        await fetch(`${GROUPING_API_ENDPOINT}/deduplicate?group_id=${groupId}`);
        router.refresh();
      }}
    >
      重複を削除
    </button>
  );
};

export default DeduplicateButton;
