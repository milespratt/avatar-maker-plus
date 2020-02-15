import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Select profile photo text", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Select profile photo/i);
  expect(linkElement).toBeInTheDocument();
});
