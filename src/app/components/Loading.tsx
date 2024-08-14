"use client";

import { OpenAiLogo } from "@phosphor-icons/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="text-center">
        <OpenAiLogo size={48} className="animate-spin " />
      </div>
    </div>
  );
}
