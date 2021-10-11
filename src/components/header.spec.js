import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "./header";

import { TAB } from "../utils/constants";

test("Renders Correctly", async () => {
  render(<Header tab={TAB.FAVOURITE} />);
  const favTest = await screen.findAllByText(/Favourite Gists/);
  expect(favTest).toHaveLength(1);
});

test("Renders Correctly P2", async () => {
  render(<Header tab={TAB.SEARCH} />);
  const search = await screen.findAllByText(/Search For A User/);
  expect(search).toHaveLength(1);
});
