import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import GistFavouritesContainer from "./favouriteGists";

const favouriteGists = [
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

describe("Gist Favourites Container", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("12345"),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("Should render multiple gists and files as favourites", async () => {
    render(<GistFavouritesContainer favourites={favouriteGists} />);

    // Seeing the text on screen before timeout is enough
    const userName = await screen.findAllByText(/testName/);
    await screen.findAllByText(/This is my test./);
    await screen.findAllByText(/🌟 Favourite/);

    // 2 Gists
    expect(userName).toHaveLength(2);

    await waitFor(() => screen.findAllByText(/12345/));

    // 3 files
    const content = await screen.findAllByText(/12345/);
    expect(content).toHaveLength(3);
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
