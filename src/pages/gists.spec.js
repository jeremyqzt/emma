import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ReactNotification from "react-notifications-component";

import "@testing-library/jest-dom";

import Gist from "./gists";

const octoRespMock = {
  status: 200,
  url: "https://api.github.com/users/testName/gists",
  headers: {
    "cache-control": "public, max-age=60, s-maxage=60",
    "content-length": "903",
    "content-type": "application/json; charset=utf-8",
    "x-github-media-type": "github.v3; format=json",
    "x-ratelimit-limit": "60",
    "x-ratelimit-remaining": "41",
    "x-ratelimit-reset": "1633962317",
    "x-ratelimit-resource": "core",
    "x-ratelimit-used": "19",
  },
  data: [
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
      description: "This is my test - first.",
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
  ],
};

// Mock Octokit
jest.mock("@octokit/core", () => {
  return {
    Octokit: jest.fn().mockImplementation(() => {
      return {
        request: () => Promise.resolve(octoRespMock),
      };
    }),
  };
});

describe("Gists Page", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        text: () => Promise.resolve("file-content-123"),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("Should allow user to search Gists and favourite", async () => {
    const page = render(
      <>
        {" "}
        <ReactNotification />
        <Gist />
      </>
    );
    const input = screen.getByTestId("user-input-element");
    fireEvent.change(input, { target: { value: "jeremy" } });
    fireEvent.click(screen.getByText("Search Gists")); //Search

    await waitFor(() => screen.findAllByText(/testName/));

    const userName = await screen.findAllByText(/testName/);
    await screen.findAllByText(/This is my test./);
    await screen.findAllByText(/🌟 Favourite/);

    // 2 Gists
    expect(userName).toHaveLength(2);

    // Favourite first one
    fireEvent.click(screen.getAllByText(/🌟 Favourite/)[0]);
    fireEvent.click(screen.getByText(/Favourites/)); //Favourites Tab

    const favsUserName = await screen.findAllByText(/testName/);
    const firstGistDescrip = await screen.findAllByText(
      /This is my test - first./
    );
    // 1 Gists in favourites, matching our descrip
    expect(favsUserName).toHaveLength(1);
    expect(firstGistDescrip).toHaveLength(1);

    fireEvent.click(screen.getAllByText(/🛑 Un-Favourite/)[0]);

    const empty = await screen.findAllByText(
      /❌ Wow, Such Empty - No Gists Here/
    );

    // 1 empty comp
    expect(empty).toHaveLength(1);
  });
});
