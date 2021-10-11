import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import Loading from './loading';

test('loads and displays greeting', async () => {
  render(<Loading />);

  const element = screen.getByTestId('loading-element');
  expect(element).toBeTruthy();
});