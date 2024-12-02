import MessageItem from "../MessageItem/MessageItem";
import { Message } from "../../types/Message";

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div data-testid="message-list" className="message-list">
        <p className="empty-message">No messages yet</p>
      </div>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div data-testid="message-list" className="message-list">
      {sortedMessages.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
    </div>
  );
}
