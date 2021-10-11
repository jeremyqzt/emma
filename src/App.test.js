import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search header', () => {
  render(<App />);
  const searchElem = screen.getByText(/Search For A User/i);
  expect(searchElem).toBeInTheDocument();
});
