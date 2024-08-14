"use client";
import {
  CircleNotch,
  OpenAiLogo,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Header } from "./layouts/Header";

type Props = {
  conversation_id: string;
};
export const NewChat = ({ conversation_id }: Props) => {
  const recommendations = [
    {
      title: "Dialog",
      message:
        "Tulis dialog antara dua sahabat di kedai kopi—satu baru dapat promosi, yang lain punya masalah berat.",
    },
    {
      title: "Deskripsi Ruangan",
      message:
        "Gambarkan ruang tamu minimalis dengan nuansa modern dan nyaman.",
    },
    {
      title: "Cerita Pendek",
      message:
        "Buat cerita tentang penjelajah yang menemukan pulau tersembunyi dengan suku kuno.",
    },
    {
      title: "Lirik Lagu",
      message:
        "Tulis lirik lagu pop tentang perjalanan hidup yang penuh tantangan menuju kebahagiaan.",
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chatSessionId, setChatSessionId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<string>("");
  const [chatList, setChatList] = useState<
    { message: string; answer: string }[]
  >([]);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<number>();
  const router = useRouter();

  const sendMessage = (message: string) => {
    setChat(message);
    setMessage("");
    sendChat(message);
  };

  const getChats = async (conversation_id: string) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/chats?chat_session_id=${conversation_id}`
      );
      setChatList([...chatList, ...response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const sendChat = async (message: string) => {
    try {
      setChat(message);
      setIsLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/chats", {
        message,
        chat_session_id: chatSessionId,
      });

      router.push(`${response.data.data.chat_session_id}`);

      setChatList([
        ...chatList,
        { message, answer: response.data.data.answer },
      ]);
      setMessage("");
      setChat("");

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const selectRecommendation = (index: number) => {
    if (index == selectedRecommendation) {
      setSelectedRecommendation(undefined);
      setMessage("");
      return;
    }
    setSelectedRecommendation(index);
    setMessage(recommendations[index].message as string);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (conversation_id !== "new") {
      setChatSessionId(conversation_id);
      getChats(conversation_id);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatList, isLoading]);

  return (
    <div className="flex flex-col items-center justify-end self-end laptop:pt-10 laptop:px-10 laptop:mx-auto pb-2 laptop:pb-5 w-full h-full max-w-3xl ">
      <Header />
      {conversation_id == "new" ? (
        <div className="flex flex-col items-center justify-end px-10 mb-4 h-full mt-5">
          <p className="text-2xl font-medium text-center mt-10 mb-5">
            <OpenAiLogo size={40} weight="fill" className="mx-auto" />
            Halo! Apa yang ingin saya bantu?
          </p>
          <div className="grid grid-cols-2 grid-rows-2 gap-2 mb-10">
            {recommendations.map((recommendation, index) => (
              <div
                onClick={() => selectRecommendation(index)}
                key={index}
                className={`flex items-center justify-center text-center rounded-2xl p-4 bg-white cursor-pointer ${
                  selectedRecommendation === index ? "border border-red" : " "
                }`}
              >
                <p className="font-semibold">{recommendation.title}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full mb-4 h-full mt-5 overflow-scroll">
          {chatList.map((chat, index) => (
            <div
              key={index}
              className="flex flex-col justify-end gap-4 w-full mb-4"
            >
              <div className="flex self-end bg-red text-white rounded-xl rounded-br-none p-2">
                {chat.message}
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <OpenAiLogo size={20} weight="fill" />
                </div>
                <div className="flex self-start bg-white text-black rounded-xl rounded-bl-none p-2 w-fit">
                  {chat.answer}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div
              className="flex flex-col justify-end gap-4 w-full"
            >
              <div className="flex self-end bg-red text-white rounded-xl rounded-br-none p-2 w-fit">
                {chat}
              </div>
              <div className="animate-pulse flex items-center gap-2 mt-4">
                <div className="rounded-full bg-slate-300 h-9 w-9"></div>
                <div className="rounded-xl rounded-bl-none bg-slate-300 h-10 w-1/3"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Message Input Field */}
      <div className="flex gap-2 bg-white shadow rounded-2xl px-4 py-2 w-full">
        <input
          type="text"
          placeholder="Message"
          className="w-full bg-transparent outline-none"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          onClick={() => sendMessage(message)}
          className="bg-red text-white rounded-lg p-2"
        >
          {isLoading ? (
            <CircleNotch size={20} className="animate-spin" weight="bold" />
          ) : (
            <PaperPlaneRight size={20} />
          )}
        </button>
      </div>
    </div>
  );
};
