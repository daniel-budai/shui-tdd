import { useState } from "react";
import { Message } from "../types/Message";

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (messageData: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...messageData,
      id: crypto.randomUUID(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sortedMessages = messages.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return {
    messages: sortedMessages,
    addMessage,
  };
}
