"use client";
import { NewChat } from "@/app/components/NewChat";

export default function page({
  params,
}: {
  params: { conversation_id: string };
}) {
  return <NewChat conversation_id={params.conversation_id} />;
}
