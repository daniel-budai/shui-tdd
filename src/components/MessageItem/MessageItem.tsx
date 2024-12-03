import { Message } from "../../types/Message";
import { formatDate } from "../../utils/dateFormatter";

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
        <time className="timestamp">{formatDate(timestamp)}</time>
      </div>
      <p className="message-content">{content}</p>
    </div>
  );
}
