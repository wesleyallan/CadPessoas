/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";

import "@testing-library/jest-dom";

import { Input } from "./Input";

describe("<Input/>", () => {
  test("Render individual <Input/> and check if they rendered as they should", () => {
    const defaultValue = "Default value";

    const rendered = render(<Input defaultValue={defaultValue} />);
    const { getByDisplayValue } = rendered;

    const element = getByDisplayValue(defaultValue);

    expect(element).toBeInTheDocument();
    expect(element).toBeInstanceOf(HTMLInputElement);
    expect(element).toHaveAttribute("class");
    expect(element).toHaveAttribute("value", defaultValue);
  });

  test("Render two <Input/> components and compare if they aren't equal", () => {
    const defaultValueText = "Default value";
    const placeholderText = "Default placeholder";

    const rendered = render(
      <>
        <Input defaultValue={defaultValueText} />
        <Input placeholder={placeholderText} />
      </>,
    );
    const { getByDisplayValue, getByPlaceholderText } = rendered;

    const defaultValue = getByDisplayValue(defaultValueText);
    const placeholder = getByPlaceholderText(placeholderText);

    expect(defaultValue).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();

    expect(defaultValue).toBeInstanceOf(HTMLInputElement);
    expect(placeholder).toBeInstanceOf(HTMLInputElement);

    expect(defaultValue).toHaveAttribute("value", defaultValueText);
    expect(defaultValue).not.toHaveAttribute("placeholder");

    expect(placeholder).toHaveAttribute("placeholder", placeholderText);
    expect(placeholder).not.toHaveAttribute("value");

    expect(defaultValue).not.toEqual(placeholder);
  });
});
