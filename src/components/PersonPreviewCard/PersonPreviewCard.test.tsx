import '@testing-library/jest-dom/vitest';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PersonPreviewCard } from '@/components/PersonPreviewCard';

import { lukeSkywalker } from '@/__tests__/mocks/peopleMocks';

describe('PersonPreviewCard', () => {
  it('displays person card correctly', () => {
    render(
      <MemoryRouter>
        <PersonPreviewCard person={lukeSkywalker} />
      </MemoryRouter>
    );

    expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
  });
});
