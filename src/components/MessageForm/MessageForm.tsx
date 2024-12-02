import { useState } from "react";
import { Message } from "../../types/Message";

interface MessageFormProps {
  onSubmit: (message: Omit<Message, "id">) => void;
  onClose: () => void;
}

export default function MessageForm({ onSubmit, onClose }: MessageFormProps) {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) {
      setError("Message cannot be empty");
      return;
    }

    onSubmit({
      username: username.trim() || "Anonymous",
      content: content.trim(),
      timestamp: new Date(),
    });

    setUsername("");
    setContent("");
    setError("");
  };

  const handleClose = () => {
    setUsername("");
    setContent("");
    setError("");
    onClose();
  };

  return (
    <div data-testid="message-form" className="message-form">
      <input
        className="username-input"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <textarea
        className="message-input"
        placeholder="Message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      <div className="button-group">
        <button onClick={handleSubmit}>Post Message</button>
        <button onClick={handleClose}>Back to Messages</button>
      </div>
    </div>
  );
}
