import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useNavigation } from "./useNavigation";

describe("useNavigation Hook", () => {
  describe("Initialization", () => {
    it("should initialize with list view", () => {
      const { result } = renderHook(() => useNavigation());
      expect(result.current.currentView).toBe("list");
    });
  });

  describe("View Navigation", () => {
    it("should navigate to form view", () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.navigateTo("form");
      });
      expect(result.current.currentView).toBe("form");
    });

    it("should navigate back to list view", () => {
      const { result } = renderHook(() => useNavigation());

      act(() => {
        result.current.navigateTo("form");
        result.current.navigateTo("list");
      });
      expect(result.current.currentView).toBe("list");
    });
  });
});
