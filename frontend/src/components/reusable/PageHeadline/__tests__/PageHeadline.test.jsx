import { screen, render } from "@testing-library/react";

import { PageHeadline } from "../PageHeadline";

test("PageHeadline", () => {
  render(<PageHeadline />);
  const pageHeadline = screen.getByRole("heading");
  expect(pageHeadline).toBeVisible();
});
