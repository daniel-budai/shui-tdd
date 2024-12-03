import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";

describe("Navigation", () => {
  describe("Navigation Display", () => {
    it("should show correct button in list view", () => {
      render(<Navigation view="list" onNavigate={() => {}} />);
      expect(screen.getByText("New Message")).toBeInTheDocument();
    });

    it("should show correct button in form view", () => {
      render(<Navigation view="form" onNavigate={() => {}} />);
      expect(screen.getByText("Back to Messages")).toBeInTheDocument();
    });
  });

  describe("Navigation Actions", () => {
    it("should handle navigation to form", () => {
      const onNavigate = vi.fn();
      render(<Navigation view="list" onNavigate={onNavigate} />);
      fireEvent.click(screen.getByText("New Message"));
      expect(onNavigate).toHaveBeenCalledWith("form");
    });

    it("should handle navigation to list", () => {
      const onNavigate = vi.fn();
      render(<Navigation view="form" onNavigate={onNavigate} />);
      fireEvent.click(screen.getByText("Back to Messages"));
      expect(onNavigate).toHaveBeenCalledWith("list");
    });
  });
});
