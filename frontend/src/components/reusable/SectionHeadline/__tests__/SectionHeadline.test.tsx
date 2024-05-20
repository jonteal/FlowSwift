import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionHeadline, SectionHeadlineProps } from "../SectionHeadline";

const props: SectionHeadlineProps = {
  children: "This is the headline of the section",
};

test("SectionHeadline", () => {
  render(<SectionHeadline {...props} />);
  const sectionHeadline = screen.getByRole("heading", {
    name: /this is the headline of the section/i,
  });
  expect(sectionHeadline).toBeVisible();
});
