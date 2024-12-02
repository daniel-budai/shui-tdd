import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MessageItem from "./MessageItem";

describe("MessageItem", () => {
  it("should display message with username and timestamp", () => {
    const message = {
      id: "1",
      username: "TestUser",
      content: "Test message",
      timestamp: new Date("2024-01-01T12:00:00"),
    };

    render(<MessageItem {...message} />);

    expect(screen.getByText("TestUser")).toBeInTheDocument();
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText(/January 1, 2024/)).toBeInTheDocument();
  });
});
