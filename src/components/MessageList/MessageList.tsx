import MessageItem from "../MessageItem/MessageItem";
import { Message } from "../../types/Message";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  if (messages.length === 0) {
    return (
      <div data-testid="message-list" className="p-4">
        <p className="text-center text-gray-500">No messages yet</p>
      </div>
    );
  }

  return (
    <div data-testid="message-list" className="p-4 space-y-4">
      {sortedMessages.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
    </div>
  );
}
