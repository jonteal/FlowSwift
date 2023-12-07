import { screen, render } from "@testing-library/react";
import { expect, test, vi } from 'vitest'

import type { NameValuePairProps } from "../NameValuePair";
import { NameValuePair } from "../NameValuePair";

import { NameValuePairMocks } from "./__mocks__/NameValuePairMocks";
import { useAppSelector } from "../../../../store/hooks";

const { name, value, type, children } = NameValuePairMocks

const props: NameValuePairProps = {
    name,
    value,
    type,
    children
}


vi.mock('../../../../store/hooks', () => ({
    useAppSelector: vi.fn()
}))

test("PageHeadline", () => {
  render(<NameValuePair {...props} />);
  const name = screen.getByText('Title')
  expect(name).toBeTruthy()
});
