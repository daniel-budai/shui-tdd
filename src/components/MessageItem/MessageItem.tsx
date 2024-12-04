import { Message } from "../../types/Message";
import { formatDate } from "../../utils/dateFormatter";

type MessageItemProps = Omit<Message, "id">;

export default function MessageItem({
  username,
  content,
  timestamp,
}: MessageItemProps) {
  return (
    <div
      data-testid="message-item"
      className="p-4 mb-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{username}</h3>
        <time className="text-sm text-gray-500">{formatDate(timestamp)}</time>
      </div>
      <p className="text-gray-600">{content}</p>
    </div>
  );
}
