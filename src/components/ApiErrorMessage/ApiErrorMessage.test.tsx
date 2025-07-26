import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';

import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { TEST_IDS, MESSAGES } from '@/__tests__/testConstants';

const { API_ERROR_MESSAGE } = TEST_IDS;
const { error, unknownError } = MESSAGES;

describe('ApiErrorMessage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders api error message component correctly', () => {
    render(<ApiErrorMessage errorMessage={error} />);

    const errorContainer = screen.getByTestId(API_ERROR_MESSAGE);
    expect(errorContainer).toBeInTheDocument();

    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders without error message in props', () => {
    render(<ApiErrorMessage />);

    const errorContainer = screen.getByTestId(API_ERROR_MESSAGE);
    expect(errorContainer).toBeInTheDocument();

    const errorMessage = screen.getByText(unknownError);
    expect(errorMessage).toBeInTheDocument();
  });
});
