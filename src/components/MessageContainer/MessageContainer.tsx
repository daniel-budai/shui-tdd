import { useMessages } from "../../hooks/useMessages";
import { useNavigation } from "../../hooks/useNavigation";
import MessageList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";
import Navigation from "../Navigation/Navigation";
import { messageService } from "../../services/messageService";
import type { Message } from "../../types/Message";

export default function MessageContainer() {
  const { messages, addMessage } = useMessages();
  const { currentView, navigateTo } = useNavigation();

  const handleSubmit = (messageData: Omit<Message, "id">) => {
    const message = messageService.createMessage(messageData);
    addMessage(message);
    navigateTo("list");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-50 rounded-lg shadow-lg">
      {currentView === "form" ? (
        <MessageForm
          onSubmit={handleSubmit}
          onClose={() => navigateTo("list")}
        />
      ) : (
        <>
          <Navigation view={currentView} onNavigate={navigateTo} />
          <MessageList messages={messages} />
        </>
      )}
    </div>
  );
}
