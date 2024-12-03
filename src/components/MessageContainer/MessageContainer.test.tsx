import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MessageContainer from "./MessageContainer";

describe("MessageContainer", () => {
  describe("Message Creation", () => {
    it("should allow creating a new message through the form", () => {
      render(<MessageContainer />);
      fireEvent.click(screen.getByText("New Message"));
      expect(screen.getByTestId("message-form")).toBeInTheDocument();
    });

    it("should save and display new message in the list after submission", () => {
      render(<MessageContainer />);

      // Navigate and create message
      fireEvent.click(screen.getByText("New Message"));
      fireEvent.change(screen.getByPlaceholderText("Username"), {
        target: { value: "TestUser" },
      });
      fireEvent.change(screen.getByPlaceholderText("Message"), {
        target: { value: "Test message" },
      });
      fireEvent.click(screen.getByText("Post Message"));

      // Verify message in list
      expect(screen.getByText("Test message")).toBeInTheDocument();
      expect(screen.getByText("TestUser")).toBeInTheDocument();
    });
  });

  describe("Message Viewing", () => {
    it("should display message list view as default", () => {
      render(<MessageContainer />);
      expect(screen.getByTestId("message-list")).toBeInTheDocument();
    });
  });

  describe("Navigation Between Views", () => {
    it("should provide seamless navigation between message list and form", () => {
      render(<MessageContainer />);

      // List to form
      fireEvent.click(screen.getByText("New Message"));
      expect(screen.getByTestId("message-form")).toBeInTheDocument();

      // Form to list
      fireEvent.click(screen.getByText("Back to Messages"));
      expect(screen.getByTestId("message-list")).toBeInTheDocument();
    });

    it("should clear form data when navigating away without posting", () => {
      render(<MessageContainer />);

      // Enter form data
      fireEvent.click(screen.getByText("New Message"));
      fireEvent.change(screen.getByPlaceholderText("Username"), {
        target: { value: "TestUser" },
      });
      fireEvent.change(screen.getByPlaceholderText("Message"), {
        target: { value: "Test message" },
      });

      // Navigate away and back
      fireEvent.click(screen.getByText("Back to Messages"));
      fireEvent.click(screen.getByText("New Message"));

      // Verify cleared form
      expect(screen.getByPlaceholderText("Username")).toHaveValue("");
      expect(screen.getByPlaceholderText("Message")).toHaveValue("");
    });
  });
});
