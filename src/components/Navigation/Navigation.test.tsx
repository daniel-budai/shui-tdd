import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "../../components/Navigation/Navigation";
import App from "../../App";

describe("Navigation", () => {
  it("should render navigation buttons", () => {
    render(<Navigation view="list" onNavigate={() => {}} />);
    expect(screen.getByText("New Message")).toBeInTheDocument();
  });

  it("should switch from list to form view", () => {
    const onNavigate = vi.fn();
    render(<Navigation view="list" onNavigate={onNavigate} />);

    fireEvent.click(screen.getByText("New Message"));
    expect(onNavigate).toHaveBeenCalledWith("form");
  });

  it("should switch from form to list view", () => {
    const onNavigate = vi.fn();
    render(<Navigation view="form" onNavigate={onNavigate} />);

    fireEvent.click(screen.getByText("Back to Messages"));
    expect(onNavigate).toHaveBeenCalledWith("list");
  });

  it("should clear form data when navigating away", () => {
    render(<App />);

    // Navigate to form
    fireEvent.click(screen.getByText("New Message"));

    // Enter data
    fireEvent.change(screen.getByPlaceholderText("Användarnamn"), {
      target: { value: "TestUser" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Skriv ditt meddelande här..."),
      {
        target: { value: "Test message" },
      }
    );

    // Navigate back to list
    fireEvent.click(screen.getByText("Back to Messages"));

    // Navigate to form again
    fireEvent.click(screen.getByText("New Message"));

    // Check that form is cleared
    expect(screen.getByPlaceholderText("Användarnamn")).toHaveValue("");
    expect(
      screen.getByPlaceholderText("Skriv ditt meddelande här...")
    ).toHaveValue("");
  });
});
