import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Loader } from '@/components/ui/Loader';

import { TEST_IDS } from '@/__tests__/testConstants';

const { LOADER } = TEST_IDS;

describe('Loader', () => {
  it('renders loader component', () => {
    render(<Loader />);
    const loader = screen.getByTestId(LOADER);
    expect(loader).toBeInTheDocument();
  });
});
