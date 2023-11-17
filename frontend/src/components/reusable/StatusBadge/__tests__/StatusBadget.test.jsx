import { screen, render } from "@testing-library/react";

import { StatusBadge } from "../StatusBadge";

const props = {
  status: "notStarted",
  position: "left",
  className: "",
};

test("Status Badge Not Started status", () => {
  render(<StatusBadge {...props} />);
  screen.debug();
  const statusText = screen.getByText("Not Started");
  expect(statusText).toBeVisible();
});
