import { useState } from "react";
import { messageService } from "../../services/messageService";
import { MESSAGES } from "../../constants/messages";

interface MessageFormProps {
  onSubmit: (message: {
    username: string;
    content: string;
    timestamp: Date;
  }) => void;
  onClose: () => void;
}

export default function MessageForm({ onSubmit, onClose }: MessageFormProps) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const validationError = messageService.validateMessage(content);
    if (validationError) {
      setError(validationError);
      return;
    }

    onSubmit({
      username: messageService.formatUsername(username),
      content: content.trim(),
      timestamp: new Date(),
    });
  };

  return (
    <div data-testid="message-form" className="p-4 bg-white rounded-lg shadow">
      <div className="space-y-4">
        <input
          type="text"
          placeholder={MESSAGES.PLACEHOLDERS.USERNAME}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder={MESSAGES.PLACEHOLDERS.MESSAGE}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            {MESSAGES.LABELS.BACK_TO_MESSAGES}
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {MESSAGES.LABELS.POST_MESSAGE}
          </button>
        </div>
      </div>
    </div>
  );
}
