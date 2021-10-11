import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NoUser from "./noUser";

describe("No User", () => {
  it("Should render the no user text", async () => {
    render(<NoUser />);
    const text = await screen.findAllByText(
      /❌ No Such User \(Wow, Such Missing\)/
    );
    expect(text).toHaveLength(1);
  });
});
