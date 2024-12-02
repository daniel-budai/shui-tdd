import { useState } from "react";
import MessageList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";
import Navigation from "./components/Navigation/Navigation";
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
          <Navigation
            view={showForm ? "form" : "list"}
            onNavigate={(view) => setShowForm(view === "form")}
          />
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
}
