import { render, screen } from '@testing-library/react';
import Header from './index';

// test page render container display text
test('<Header />', () => {
  render(<Header title="Header title" />);
  const linkElement = screen.getByText(/Header title/i);
  expect(linkElement).toBeInTheDocument();
});