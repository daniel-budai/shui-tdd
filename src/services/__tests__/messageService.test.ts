import { describe, it, expect, vi } from "vitest";
import { messageService } from "../messageService";
import { MESSAGES } from "../../constants/messages";

describe("messageService", () => {
  describe("Message Creation", () => {
    it("should create a message with a generated id", () => {
      const mockUUID = "123-456";
      vi.stubGlobal("crypto", {
        randomUUID: () => mockUUID,
      });

      const messageData = {
        username: "TestUser",
        content: "Test message",
        timestamp: new Date(),
      };

      const result = messageService.createMessage(messageData);
      expect(result).toEqual({
        ...messageData,
        id: mockUUID,
      });
    });
  });

  describe("Message Validation", () => {
    it("should validate empty message", () => {
      expect(messageService.validateMessage("")).toBe(
        MESSAGES.ERRORS.EMPTY_MESSAGE
      );
      expect(messageService.validateMessage("  ")).toBe(
        MESSAGES.ERRORS.EMPTY_MESSAGE
      );
      expect(messageService.validateMessage("Valid message")).toBeNull();
    });
  });

  describe("Username Formatting", () => {
    it("should format username correctly", () => {
      expect(messageService.formatUsername("")).toBe(MESSAGES.DEFAULT_USERNAME);
      expect(messageService.formatUsername("  ")).toBe(
        MESSAGES.DEFAULT_USERNAME
      );
      expect(messageService.formatUsername("TestUser")).toBe("TestUser");
      expect(messageService.formatUsername("  TestUser  ")).toBe("TestUser");
    });
  });
});
