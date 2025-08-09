import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';

import { MainLayout } from '@/layouts/MainLayout/MainLayout';

import { TEST_IDS } from '@/__tests__/testConstants';

describe('Main Layout', () => {
  it('renders MainLayout with header', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    );

    const header = screen.getByTestId(TEST_IDS.HEADER);
    expect(header).toBeInTheDocument();

    const main = screen.getByTestId(TEST_IDS.MAIN);
    expect(main).toBeInTheDocument();
  });
});
