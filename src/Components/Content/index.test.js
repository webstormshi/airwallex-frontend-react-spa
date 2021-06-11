import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Content from './index';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

afterEach(cleanup);

test("<Content />", () => {
    const { getByTestId, getByText } = render(<Content />);
    // fireEvent.click(getByText("Request an invite"));
    expect(getByText("Request an invite")).toBeInTheDocument();
});