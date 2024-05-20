import { screen, render } from "@testing-library/react";
import { expect, test } from "vitest";

import type { NameValuePairProps } from "../NameValuePair";
import { NameValuePair } from "../NameValuePair";

const props: NameValuePairProps = {
  name: "Title",
  value: "Mr Smith",
  type: "header",
};

test("PageHeadline", () => {
  render(<NameValuePair {...props} />);
  const name = screen.getByText("Title");
  expect(name).toBeVisible();

  const value = screen.getByText("Mr Smith");
  expect(value).toBeVisible();
});
