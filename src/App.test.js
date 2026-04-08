import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app successfully', () => {
  render(<App />);
  // "April" is the default month being rendered.
  const elements = screen.getAllByText(/April/i);
  expect(elements.length).toBeGreaterThan(0);
});
