import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Gist from "./gists";

const octoGists = [
  {
    url: "https://api.github.com/gists/3cd7cc4f15b0f104161b184433200610",
    id: "1",
    files: {
      "test.md": {
        filename: "test.md",
        type: "text/markdown",
        language: "Markdown",
        raw_url: "https://gist.githubusercontent.com/testName/1.md",
      },
    },
    description: "This is my test.",
    owner: {
      login: "testName",
    },
    truncated: false,
  },
  {
    url: "https://api.github.com/gists/3cd7cc4f15b0f104161b184433200610",
    id: "2",
    files: {
      "test2.md": {
        filename: "test2.md",
        type: "text/markdown",
        language: "Markdown",
        raw_url: "https://gist.githubusercontent.com/testName/2.md",
      },
      "test3.md": {
        filename: "test3.md",
        type: "text/markdown",
        language: "Markdown",
        raw_url: "https://gist.githubusercontent.com/testName/3.md",
      },
    },
    description: "This is my test2.",
    owner: {
      login: "testName",
    },
    truncated: false,
  },
];

describe("Gists Page", () => {
  let originalFetch;
  let originalOctoKit;

  beforeEach(() => {
    originalFetch = global.fetch;
    originalOctoKit = global.octokit;
    octomock.resetMocks(); // Resets all mock functions
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("12345"),
      })
    );

    const contents = { test: "data" };
    octomock.request = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve(contents),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
    octomock.resetMocks();
  });

  it("Should allow user to search Gists and favourite", async () => {
    const page = render(<Gist />);
    const input = screen.getByTestId("user-input-element");
    fireEvent.change(input, { target: { value: "jeremy" } });
    fireEvent.click(screen.getByText("Search Gists"));
  });
});
