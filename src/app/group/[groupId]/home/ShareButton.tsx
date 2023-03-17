"use client";

import React from "react";
import { FiShare } from "react-icons/fi";

const ShareButton = () => {
  return (
    <button
      className="absolute top-0 p-2 rounded-full right-2 bg-white/30"
      onClick={() => {
        if (!("share" in navigator)) {
          return;
        }
        navigator.share({ url: window.location.href });
      }}
    >
      <FiShare />
    </button>
  );
};

export default ShareButton;
