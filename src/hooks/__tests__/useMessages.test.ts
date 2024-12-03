import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useMessages } from "../useMessages";

describe("useMessages Hook", () => {
  describe("Initialization", () => {
    it("should initialize with an empty messages array", () => {
      const { result } = renderHook(() => useMessages());
      expect(result.current.messages).toEqual([]);
    });
  });

  describe("Message Management", () => {
    it("should add a new message and sort by timestamp", () => {
      const { result } = renderHook(() => useMessages());

      const message1 = {
        username: "User1",
        content: "First message",
        timestamp: new Date("2024-01-01"),
      };

      const message2 = {
        username: "User2",
        content: "Second message",
        timestamp: new Date("2024-01-02"),
      };

      act(() => {
        result.current.addMessage(message1);
        result.current.addMessage(message2);
      });

      expect(result.current.messages).toHaveLength(2);
      expect(result.current.messages[0].content).toBe("Second message");
      expect(result.current.messages[1].content).toBe("First message");
    });
  });
});
