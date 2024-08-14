"use client";

import {
  ChatSlash,
  OpenAiLogo,
  PlusSquare,
} from "@phosphor-icons/react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export const Sidebar = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const getConversations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/sessions");
      setConversations(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSelectConversation = async (id: string) => {
    if (isMobile()) toggleSidebar();
    router.push(`/c/${id}`);
  };

  const newConversation = () => {
    if (isMobile()) toggleSidebar();
    router.push("/c/new");
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const darkarea = document.getElementById("dark-area");
    if (sidebar && darkarea) {
      sidebar.classList.toggle("translate-x-0");
      sidebar.classList.toggle("-translate-x-full");
      darkarea.classList.toggle("hidden");
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    getConversations();
  }, [pathname]);

  return (
    <>
      <div
        id="sidebar"
        className="fixed laptop:relative top-0 left-0 z-20 flex flex-col items-start justify-between bg-white rounded-2xl h-full w-3/4 laptop:w-1/4 p-5 transition-transform transform -translate-x-full laptop:translate-x-0 duration-300 ease-in-out"
      >
        <div className="w-full">
          <div className="flex justify-center items-center mb-5">
            <OpenAiLogo size={32} weight="fill" className="mr-2" />
            <p className="font-bold text-2xl mb-0">ChatSkuy.</p>
          </div>

          <hr className="my-4" />

          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <ChatSlash size={32} />
              <p className="text-14">Belum ada percakapan</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="font-semibold mb-2">Percakapan</p>
              {conversations.map(({ id, title }) => (
                <Link
                  key={id}
                  className={`flex justify-start items-center rounded-lg p-4 laptop:p-2 hover:bg-grey w-full ${
                    pathname === `/c/${id}` ? "bg-grey" : ""
                  }`}
                  onClick={() => handleSelectConversation(id)}
                  href={`/c/${id}`}
                >
                  <p className="text-14 line-clamp-2">{title}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* New Conversation Button */}
        <div
          onClick={() => newConversation()}
          className="flex justify-between items-center bg-red text-white w-full rounded-lg px-4 py-2 cursor-pointer"
        >
          <p className="text-14">Percakapan Baru</p>
          <PlusSquare size={32} weight="fill" />
        </div>
      </div>

      <div
        id="dark-area"
        onClick={toggleSidebar}
        className="absolute hidden laptop:hidden h-screen w-screen top-0 left-0 bg-black opacity-70 z-10"
      ></div>
    </>
  );
};
