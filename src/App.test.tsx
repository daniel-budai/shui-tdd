import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Navigation", () => {
  it("should show message list view by default", () => {
    render(<App />);
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
  });

  it("should switch between message list and new message form", () => {
    render(<App />);
    const newMessageButton = screen.getByText("New Message");

    fireEvent.click(newMessageButton);
    expect(screen.getByTestId("message-form")).toBeInTheDocument();

    const backButton = screen.getByText("Back to Messages");
    fireEvent.click(backButton);
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
  });

  it("should add new message and display it in the list", () => {
    render(<App />);

    // Navigate to form
    fireEvent.click(screen.getByText("New Message"));

    // Fill and submit form
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Message"), {
      target: { value: "Test message" },
    });
    fireEvent.click(screen.getByText("Post Message"));

    // Verify message appears in list
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByText("TestUser")).toBeInTheDocument();
  });
});
