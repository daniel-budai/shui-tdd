import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render MessageContainer", () => {
    render(<App />);
    expect(screen.getByTestId("message-list")).toBeInTheDocument();
  });
});
