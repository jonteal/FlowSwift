import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { PriorityBadge, PriorityBadgeProps } from "../PriorityBadge";

const props: PriorityBadgeProps = {
  priority: "low",
};

test("Status Badge Not Started status", () => {
  render(<PriorityBadge {...props} />);
  const statusText = screen.getByText("Low");
  expect(statusText).toBeVisible();
});
