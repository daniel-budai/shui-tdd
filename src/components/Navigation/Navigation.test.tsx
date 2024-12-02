import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";

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
});
