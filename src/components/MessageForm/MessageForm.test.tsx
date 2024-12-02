import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageForm from "./MessageForm";

describe("MessageForm", () => {
  it("should render form with username and message inputs", () => {
    render(<MessageForm onSubmit={() => {}} onClose={() => {}} />);
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Message")).toBeInTheDocument();
    expect(screen.getByText("Post Message")).toBeInTheDocument();
  });

  it("should show error when submitting empty message", () => {
    render(<MessageForm onSubmit={() => {}} onClose={() => {}} />);

    const submitButton = screen.getByText("Post Message");
    fireEvent.click(submitButton);

    expect(screen.getByText("Message cannot be empty")).toBeInTheDocument();
  });

  it("should clear form after successful submission", () => {
    const onSubmit = vi.fn();
    render(<MessageForm onSubmit={onSubmit} onClose={() => {}} />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const messageInput = screen.getByPlaceholderText("Message");

    fireEvent.change(usernameInput, { target: { value: "TestUser" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    const submitButton = screen.getByText("Post Message");
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({
      username: "TestUser",
      content: "Test message",
      timestamp: expect.any(Date),
    });

    expect(usernameInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });

  it("should clear form when navigating away", () => {
    const onClose = vi.fn();
    render(<MessageForm onSubmit={() => {}} onClose={onClose} />);

    const usernameInput = screen.getByPlaceholderText("Username");
    const messageInput = screen.getByPlaceholderText("Message");

    fireEvent.change(usernameInput, { target: { value: "TestUser" } });
    fireEvent.change(messageInput, { target: { value: "Test message" } });

    const backButton = screen.getByText("Back to Messages");
    fireEvent.click(backButton);

    expect(onClose).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("");
    expect(messageInput).toHaveValue("");
  });
});
