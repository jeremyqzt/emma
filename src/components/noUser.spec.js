import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

import NoUser from './noUser';

test('loads and displays greeting', async () => {
  render(<NoUser />);

  const text = await screen.findAllByText(/❌ No Such User \(Wow, Such Missing\)/);
  expect(text).toHaveLength(1);
});