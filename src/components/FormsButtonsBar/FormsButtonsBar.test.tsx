import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormsButtonsBar } from './FormsButtonsBar';
import type { FormType } from '@/types/forms';

describe('<FormsButtonsBar />', () => {
  let openModal: (type: FormType) => void;

  beforeEach(() => {
    vi.clearAllMocks();
    openModal = vi.fn();
  });

  it('renders both buttons', () => {
    render(<FormsButtonsBar openModal={openModal} />);

    const btnControlled = screen.getByRole('button', {
      name: /open controlled modal/i,
    });
    const btnUncontrolled = screen.getByRole('button', {
      name: /open uncontrolled modal/i,
    });

    expect(btnControlled).toBeInTheDocument();
    expect(btnUncontrolled).toBeInTheDocument();
  });

  it('calls open Controlled Modal', async () => {
    render(<FormsButtonsBar openModal={openModal} />);

    await userEvent.click(
      screen.getByRole('button', { name: /open controlled modal/i })
    );
    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith('controlled');
  });

  it('calls open Uncontrolled Modal', async () => {
    render(<FormsButtonsBar openModal={openModal} />);

    await userEvent.click(
      screen.getByRole('button', { name: /open uncontrolled modal/i })
    );
    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith('uncontrolled');
  });
});
