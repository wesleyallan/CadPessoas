/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Field } from "./Field";

describe("<Field/>", () => {
  test("Render individual <Field/> component and check if they rendered as they should", () => {
    const children = "Default children";

    const rendered = render(<Field>{children}</Field>)
    const { getByText } = rendered;

    const element = getByText(children);
    expect(element).toBeInTheDocument();
    expect(element).toBeInstanceOf(HTMLDivElement);
    expect(element).toHaveAttribute("aria-orientation");
    expect(element).toHaveAttribute("class");

    const newChildren = "New children";
    element.innerHTML = newChildren;
    expect(element).toHaveTextContent(newChildren);
  });

  test("Render two <Field/> components and compare if they aren't equal", () => {
    const text1 = "Default children 1";
    const text2 = "Default children 2";

    const rendered = render(
      <>
        <Field orientation="vertical">{text1}</Field>
        <Field orientation="horizontal">{text2}</Field>
      </>,
    );
    const { getByText } = rendered;

    const field1 = getByText(text1);
    const field2 = getByText(text2);

    expect(field1).toBeInTheDocument();
    expect(field2).toBeInTheDocument();

    expect(field1).toBeInstanceOf(HTMLDivElement);
    expect(field2).toBeInstanceOf(HTMLDivElement);

    expect(field1).toHaveAttribute("aria-orientation", "vertical");
    expect(field2).toHaveAttribute("aria-orientation", "horizontal");

    expect(field1).not.toEqual(field2);
  });
});
