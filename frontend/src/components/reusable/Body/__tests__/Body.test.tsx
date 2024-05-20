import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Body, BodyProps } from "../Body";

const props: BodyProps = {
  children: "This is a body",
  className: "mt-2",
};

test("Body component", () => {
  render(<Body {...props} />);
  const body = screen.getByText("This is a body");
  expect(body).toBeVisible();
});
