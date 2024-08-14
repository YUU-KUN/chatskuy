"use client";

import { List, OpenAiLogo } from "@phosphor-icons/react";
import { useContext } from "react";

export const Header = () => {
  //   const toggleSidebar = () => {
  //     const sidebar = document.getElementById("sidebar");
  //     const darkarea = document.getElementById("dark-area");

  //     if (sidebar && darkarea) {
  //       sidebar.classList.toggle("hidden");
  //       darkarea.classList.toggle("hidden");
  //     }
  //   };
  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const darkarea = document.getElementById("dark-area");
    if (sidebar && darkarea) {
      sidebar.classList.toggle("translate-x-0");
      sidebar.classList.toggle("-translate-x-full");
      darkarea.classList.toggle("hidden");
    }
  };

  return (
    <div className="sticky top-0 laptop:hidden flex items-center justify-center bg-white w-full p-5 text-center rounded-xl">
      <div onClick={() => toggleSidebar()} className="absolute left-5 top-5">
        <List size={28} className="rounded-full hover:bg-grey" />
      </div>
      <div className="flex justify-start items-center">
        <OpenAiLogo size={32} weight="fill" className="mr-2" />
        <p className="font-bold text-2xl mb-0">ChatSkuy.</p>
      </div>
    </div>
  );
};
