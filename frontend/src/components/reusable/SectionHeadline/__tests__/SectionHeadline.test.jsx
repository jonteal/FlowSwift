import { screen, render } from "@testing-library/react";

import { SectionHeadline } from "../SectionHeadline";

test("SectionHeadline", () => {
  render(<SectionHeadline />);
  const sectionHeadline = screen.getByRole("heading");
  expect(sectionHeadline).toBeVisible();
});
