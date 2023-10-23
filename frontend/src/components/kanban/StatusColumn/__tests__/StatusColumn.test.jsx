import { screen, render } from "@testing-library/react";
import { StatusColumn } from "../StatusColumn";

test("render correctly", () => {
  render(<StatusColumn />);
  screen.debug();
  //   const titleElement = screen.getByRole("heading");
  //   expect(titleElement).toBeInTheDocument();
});
