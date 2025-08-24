import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('@hookform/resolvers/yup', () => ({
  yupResolver: () => async (data: unknown) => ({ values: data, errors: {} }),
}));

const dispatchMock = vi.fn();

type MockRootState = {
  countries: { countries: Country[] };
};

vi.mock('@/hooks', () => {
  const useAppDispatch = () => dispatchMock;
  const useAppSelector = <T,>(selector: (state: MockRootState) => T): T =>
    selector({ countries: { countries: COUNTRIES } });

  return { useAppDispatch, useAppSelector };
});

vi.mock('@/components/PasswordStrength', () => ({
  PasswordStrength: ({ password }: { password: string }) => (
    <div data-testid="password-strength">{password}</div>
  ),
}));

import { FormControlled } from './FormControlled';
import { COUNTRIES } from '@/constants';
import type { Country } from '@/types/countries';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('FormControlled', () => {
  it('renders required fields', () => {
    render(<FormControlled closeModal={vi.fn()} />);

    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile picture/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/country \*/i)).toBeInTheDocument();
    const options = document.querySelectorAll('#country-list > option');
    expect(options).toHaveLength(COUNTRIES.length);
    expect(options[0]).toHaveAttribute('value', COUNTRIES[0].name);

    expect(
      screen.getByLabelText(/i accept the terms and conditions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /add user/i })
    ).toBeInTheDocument();
  });

  it('renders Password Strength and update its value', async () => {
    render(<FormControlled closeModal={vi.fn()} />);

    const ps = screen.getByTestId('password-strength');
    expect(ps).toHaveTextContent('');

    await userEvent.type(screen.getByLabelText(/^password \*/i), 'Aa1!');
    expect(ps).toHaveTextContent('Aa1!');
  });
});
