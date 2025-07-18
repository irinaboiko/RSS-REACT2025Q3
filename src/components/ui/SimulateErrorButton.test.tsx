import '@testing-library/jest-dom/vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';

import SimulateErrorButton from './SimulateErrorButton';

describe('SimulateErrorButton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders button correctly', () => {
    render(<SimulateErrorButton onClick={() => {}} />);

    const button = screen.getByText(/throw simulated error/i);
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const handleClick = vi.fn();
    render(<SimulateErrorButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
