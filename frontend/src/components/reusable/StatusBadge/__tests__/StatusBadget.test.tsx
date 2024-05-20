import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { StatusBadge, StatusBadgeProps } from "../StatusBadge";

const props: StatusBadgeProps = {
  status: "notStarted",
  position: "left",
  className: "",
};

test("Status Badge Not Started status", () => {
  render(<StatusBadge {...props} />);
  const statusText = screen.getByText("Not Started");
  expect(statusText).toBeVisible();
});
