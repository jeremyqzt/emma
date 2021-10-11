import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "./header";

import { TAB } from "../utils/constants";


describe("Header", () => {
  it("Should render the favourites tab", async () => {
  render(<Header tab={TAB.FAVOURITE} />);
  const favTest = await screen.findAllByText(/Favourite Gists/);
  expect(favTest).toHaveLength(1);
  });

  it("Should render the search tab", async () => {
    render(<Header tab={TAB.SEARCH} />);
    const search = await screen.findAllByText(/Search For A User/);
    expect(search).toHaveLength(1);
  });
});
