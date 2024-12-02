import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageList from "./MessageList";

describe("MessageList", () => {
  it("should show empty state message when no messages exist", () => {
    render(<MessageList messages={[]} />);
    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });

  it("should display messages sorted by timestamp (newest first)", () => {
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
});
