import { render, screen } from '@testing-library/react';
import App from './App';

// test page render container display text
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/@ 2016 Broccoli & Co. All rights reserved./i);
  expect(linkElement).toBeInTheDocument();
});
