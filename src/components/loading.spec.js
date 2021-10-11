import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "./loading";

describe("Loading", () => {
  it("Should render the loading element", async () => {
    render(<Loading />);

    const element = screen.getByTestId("loading-element");
    expect(element).toBeTruthy();
  });
});
