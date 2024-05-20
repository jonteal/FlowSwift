import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { PageHeadline, PageHeadlineProps } from "../PageHeadline";

const props: PageHeadlineProps = {
  children: "This is the page headline!",
};

test("PageHeadline", () => {
  render(<PageHeadline {...props} />);
  const pageHeadline = screen.getByRole("heading", {
    name: /this is the page headline/i,
  });
  expect(pageHeadline).toBeVisible();
});
