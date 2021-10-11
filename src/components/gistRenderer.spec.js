import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import GistRenderer from "./gistRenderer";

const exampleGist = {
  url: "https://api.github.com/gists/3cd7cc4f15b0f104161b184433200610",
  id: "3cd7cc4f15b0f104161b184433200610",
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
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("test123"),
  })
);

describe("Gist Renderer", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("test123"),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("Should have proper description and content after data fetch", async () => {
    render(<GistRenderer gist={exampleGist} shouldFetchGists />);
    await screen.findAllByText(/testName/);
    await screen.findAllByText(/This is my test./);
    await screen.findAllByText(/🌟 Favourite/);

    await waitFor(() => screen.findAllByText(/test123/));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("Should have proper description and content after data fetch but denote as favourites", async () => {
    render(<GistRenderer gist={exampleGist} alreadyFaved shouldFetchGists />);
    await screen.findAllByText(/testName/);
    await screen.findAllByText(/This is my test./);
    await screen.findAllByText(/✔️ Favourited/);
    await waitFor(() => screen.findAllByText(/test123/));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("Shouldn't fetch if told not to", async () => {
    render(<GistRenderer gist={exampleGist} shouldFetchGists={false} />);
    await screen.findAllByText(/testName/);
    await screen.findAllByText(/This is my test./);
    await screen.findAllByText(/🌟 Favourite/);
    expect(fetch).toHaveBeenCalledTimes(0);
  });
});
