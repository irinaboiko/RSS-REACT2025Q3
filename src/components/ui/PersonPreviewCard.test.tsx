import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import PersonPreviewCard from './PersonPreviewCard.tsx';

import { lukeSkywalker } from '../../__tests__/mocks/peopleMocks.ts';

describe('PersonPreviewCard', () => {
  it('displays person card correctly', () => {
    render(<PersonPreviewCard person={lukeSkywalker} />);

    expect(screen.getByText(/id:/i)).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    expect(screen.getByText(/person name:/i)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText(/find details at:/i)).toBeInTheDocument();
    expect(
      screen.getByText('https://www.swapi.tech/api/people/1')
    ).toBeInTheDocument();
  });
});
