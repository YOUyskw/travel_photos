"use client";

import React from "react";
import { FiShare } from "react-icons/fi";

const ShareButton = () => {
  return (
    <button
      className="p-2 rounded-full bg-white/30 backdrop-blur"
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
