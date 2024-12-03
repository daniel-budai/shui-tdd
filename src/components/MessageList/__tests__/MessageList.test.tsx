import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageList from "../MessageList";

describe("MessageList", () => {
  describe("Empty State", () => {
    it("should display a message indicating no messages exist", () => {
      render(<MessageList messages={[]} />);
      expect(screen.getByText("No messages yet")).toBeInTheDocument();
    });
  });

  describe("Message Display", () => {
    it("should render messages with correct order and details", () => {
      const messages = [
        {
          id: "1",
          username: "User1",
          content: "First message",
          timestamp: new Date("2024-01-01"),
        },
        {
          id: "2",
          username: "User2",
          content: "Second message",
          timestamp: new Date("2024-01-02"),
        },
      ];

      render(<MessageList messages={messages} />);

      const messageElements = screen.getAllByTestId("message-item");
      expect(messageElements[0]).toHaveTextContent("Second message");
      expect(messageElements[1]).toHaveTextContent("First message");
    });

    it("should display message metadata including username and timestamp", () => {
      const messages = [
        {
          id: "1",
          username: "User1",
          content: "Test message",
          timestamp: new Date("2024-01-01T12:00:00"),
        },
      ];

      render(<MessageList messages={messages} />);
      expect(screen.getByText("User1")).toBeInTheDocument();
      expect(screen.getByText("Test message")).toBeInTheDocument();
      expect(screen.getByText(/January 1, 2024/)).toBeInTheDocument();
    });
  });
});
