import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Button", () => {
  test("renders the text passed as children", () => {
    renderWithRouter(<Button to="/join">Join Community</Button>);
    expect(screen.getByText("Join Community")).toBeInTheDocument();
  });

  test("renders as an internal link when `to` is given", () => {
    renderWithRouter(<Button to="/join">Join Community</Button>);
    const link = screen.getByText("Join Community");
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/join");
  });

  test("renders as a plain <button> when neither `to` nor `href` is given", () => {
    renderWithRouter(<Button>Click me</Button>);
    expect(screen.getByText("Click me").tagName).toBe("BUTTON");
  });
});