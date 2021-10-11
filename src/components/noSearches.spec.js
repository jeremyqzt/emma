import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NoSearches from "./noSearches";

describe("No Searches", () => {
  it("Should render the no searches text", async () => {
    render(<NoSearches />);

    const text1 = await screen.findAllByText(
      /👋 Hello, Welcome to the Gist Demo App./
    );
    const text2 = await screen.findAllByText(
      /⌨️ Enter A Username In the Top Right to Get Started!/
    );

    expect(text1).toHaveLength(1);
    expect(text2).toHaveLength(1);
  });
});
