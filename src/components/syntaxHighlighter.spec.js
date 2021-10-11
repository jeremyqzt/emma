import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import SyntaxHighlight from "./syntaxHighlighter";

const exampleFile = {
  filename: "test.md",
  type: "text/markdown",
  language: "Markdown",
  raw_url: "https://gist.githubusercontent.com/testName/1.md",
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("test123"),
  })
);

describe("Syntax Highlighter", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("contentforhighlight"),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("Should fetch correct file content", async () => {
    render(<SyntaxHighlight file={exampleFile} skip={false} />);
    await waitFor(() => screen.findAllByText(/contentforhighlight/));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("Should not fetch file content if skipped", async () => {
    render(<SyntaxHighlight file={exampleFile} skip />);
    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
