import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NoGists from "./noGists";

describe("No Gists", () => {
  it("Should render the no gists text", async () => {
    render(<NoGists />);
    const text = await screen.findAllByText(
      /❌ Wow, Such Empty - No Gists Here/
    );
    expect(text).toHaveLength(1);
  });
});
