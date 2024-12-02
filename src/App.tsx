import { useState } from "react";
import MessageList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";
import { Message } from "./types/Message";

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addMessage = (messageData: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...messageData,
      id: crypto.randomUUID(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setShowForm(false);
  };

  return (
    <div className="container">
      {showForm ? (
        <MessageForm onSubmit={addMessage} onClose={() => setShowForm(false)} />
      ) : (
        <>
          <button
            className="new-message-button"
            onClick={() => setShowForm(true)}
          >
            New Message
          </button>
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
}
