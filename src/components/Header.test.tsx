import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Header from './Header.tsx';

describe('Header', () => {
  it('renders the heading element', () => {
    render(<Header />);

    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
  });
});
