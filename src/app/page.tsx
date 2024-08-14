"use client";

import { useEffect, useState } from "react";
import { CaretRight, OpenAiLogo } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="relative flex items-center justify-center h-screen w-screen overflow-hidden p-3 bg-white">
      <div className="absolute -right-20 -top-20 laptop:-right-28 laptop:-top-28 w-2/3 laptop:w-1/3 aspect-square rounded-full bg-gradient-to-bl from-red opacity-50 blur-3xl"></div>
      <div className="absolute -left-20 -bottom-20 laptop:-left-28 laptop:-bottom-28 w-2/3 laptop:w-1/3 first-line:w-1/3 aspect-square rounded-full bg-gradient-to-bl from-red opacity-50 blur-3xl"></div>

      <div className="flex flex-col items-center justify-center text-center laptop:w-1/2">
        <div className="flex justify-center items-center mb-5">
          <OpenAiLogo size={40} weight="fill" className="mr-2" />
          <p className="font-bold text-3xl mb-0">ChatSkuy.</p>
        </div>
        <p className="text-2xl font-bold mb-5">
          Teman Chat AI yang Cerdas dan Menyenangkan
        </p>
        <p className="text-lg font-normal mb-5">
          Dengan ChatSkuy, Anda bisa berbicara dengan AI yang memahami dan
          membantu Anda dalam berbagai kebutuhan—dari ide kreatif hingga solusi
          sehari-hari. Mulai eksplorasi obrolan tak terbatas bersama kami!
        </p>
        <button
          onClick={() => router.push("/c/new")}
          className="flex items-center justify-center gap-4 text-white bg-red hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 mt-5"
        >
          Mulai Ngobrol Sekarang <CaretRight size={12} weight="bold" />
        </button>
      </div>
    </main>
  );
}
