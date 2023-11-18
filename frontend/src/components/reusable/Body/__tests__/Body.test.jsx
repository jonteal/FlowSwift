import { screen, render } from "@testing-library/react";
import { Body } from "../Body";
import { vi } from "vitest";

const props = {
  children: "This is a body",
  className: "mt-2",
};

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

test("Body component", () => {
  render(<Body {...props} />);
  screen.debug();
});
