import { Message } from "../../types/Message";

type MessageItemProps = Omit<Message, "id">;

export default function MessageItem({
  username,
  content,
  timestamp,
}: MessageItemProps) {
  return (
    <div data-testid="message-item" className="message-item">
      <div className="message-header">
        <h3 className="username">{username}</h3>
        <time className="timestamp">
          {timestamp.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
      <p className="message-content">{content}</p>
    </div>
  );
}
