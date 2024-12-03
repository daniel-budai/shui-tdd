import { Message } from "../types/Message";
import { MESSAGES } from "../constants/messages";

export const messageService = {
  createMessage(messageData: Omit<Message, "id">): Message {
    return {
      ...messageData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
  },

  validateMessage(content: string): string | null {
    if (!content.trim()) {
      return MESSAGES.ERRORS.EMPTY_MESSAGE;
    }
    return null;
  },

  formatUsername(username: string): string {
    return username.trim() || MESSAGES.DEFAULT_USERNAME;
  },
};
