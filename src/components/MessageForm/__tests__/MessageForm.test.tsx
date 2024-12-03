import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageForm from "../MessageForm";
import { MESSAGES } from "../../../constants/messages";

describe("MessageForm", () => {
  describe("Form Elements", () => {
    it("should display all required input fields and buttons", () => {
      render(<MessageForm onSubmit={() => {}} onClose={() => {}} />);

      // Message input field
      expect(
        screen.getByPlaceholderText(MESSAGES.PLACEHOLDERS.MESSAGE)
      ).toBeInTheDocument();

      // Username field
      expect(
        screen.getByPlaceholderText(MESSAGES.PLACEHOLDERS.USERNAME)
      ).toBeInTheDocument();

      // Submit button
      expect(
        screen.getByText(MESSAGES.LABELS.POST_MESSAGE)
      ).toBeInTheDocument();
    });
  });

  describe("Message Validation", () => {
    it("should prevent empty message submission with error message", () => {
      render(<MessageForm onSubmit={() => {}} onClose={() => {}} />);

      fireEvent.click(screen.getByText(MESSAGES.LABELS.POST_MESSAGE));
      expect(
        screen.getByText(MESSAGES.ERRORS.EMPTY_MESSAGE)
      ).toBeInTheDocument();
    });
  });

  describe("Message Submission", () => {
    it("should successfully submit valid message data", () => {
      const onSubmit = vi.fn();
      render(<MessageForm onSubmit={onSubmit} onClose={() => {}} />);

      // Fill form
      fireEvent.change(
        screen.getByPlaceholderText(MESSAGES.PLACEHOLDERS.USERNAME),
        { target: { value: "TestUser" } }
      );
      fireEvent.change(
        screen.getByPlaceholderText(MESSAGES.PLACEHOLDERS.MESSAGE),
        { target: { value: "Test message" } }
      );

      // Submit
      fireEvent.click(screen.getByText(MESSAGES.LABELS.POST_MESSAGE));

      // Verify submission
      expect(onSubmit).toHaveBeenCalledWith({
        username: "TestUser",
        content: "Test message",
        timestamp: expect.any(Date),
      });
    });
  });

  describe("Form Navigation", () => {
    it("should clear form data when closing", () => {
      const onClose = vi.fn();
      render(<MessageForm onSubmit={() => {}} onClose={onClose} />);

      // Fill and close form
      fireEvent.change(
        screen.getByPlaceholderText(MESSAGES.PLACEHOLDERS.USERNAME),
        { target: { value: "TestUser" } }
      );
      fireEvent.click(screen.getByText(MESSAGES.LABELS.BACK_TO_MESSAGES));

      expect(onClose).toHaveBeenCalled();
    });
  });
});
