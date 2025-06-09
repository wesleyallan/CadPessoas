/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Label } from "./Label";

describe("<Label/>", () => {
  test("Render individual <Label/> component and check if they rendered as they should", () => {
    const children = "Default children";

    const required = render(<Label required>{children}</Label>);
    const { getByText } = required;

    const element = getByText(children);

    expect(element).toBeInTheDocument();
    expect(element).toBeInstanceOf(HTMLLabelElement);
    expect(element).toHaveAttribute("aria-required");
    expect(element).toHaveAttribute("class");
  });

  test("Render two <Label/> components and compare if they aren't equal", () => {
    const requiredChildren = "Default required children";
    const unrequiredChildren = "Default unrequired children";

    const { getByText } = render(
      <>
        <Label required>{requiredChildren}</Label>
        <Label>{unrequiredChildren}</Label>
      </>,
    );
    const required = getByText(requiredChildren);
    const unrequired = getByText(unrequiredChildren);

    expect(required).toBeInTheDocument();
    expect(unrequired).toBeInTheDocument();

    expect(required).toBeInstanceOf(HTMLLabelElement);
    expect(unrequired).toBeInstanceOf(HTMLLabelElement);

    expect(required).toHaveAttribute("aria-required");
    expect(unrequired).not.toHaveAttribute("aria-required");

    expect(unrequired).not.toEqual(required);
  });
});
