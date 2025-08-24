import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

vi.mock('@/types/forms', () => ({
  FORM_TYPES_LABELS: { controlled: 'Controlled', uncontrolled: 'Uncontrolled' },
}));

vi.mock('@/components/UsersList', () => ({
  UsersList: () => <div data-testid="users-list">UsersList</div>,
}));

vi.mock('@/components/FormControlled', () => ({
  FormControlled: ({ closeModal }: { closeModal: () => void }) => (
    <div data-testid="controlled-form">
      Controlled Form <button onClick={closeModal}>close-by-form</button>
    </div>
  ),
}));
vi.mock('@/components/FormUncontrolled', () => ({
  FormUncontrolled: ({ closeModal }: { closeModal: () => void }) => (
    <div data-testid="uncontrolled-form">
      Uncontrolled Form <button onClick={closeModal}>close-by-form</button>
    </div>
  ),
}));

vi.mock('@/utils', () => ({
  getFocusable: vi.fn(() => []),
}));

let modalRoot: HTMLDivElement;

beforeEach(() => {
  vi.clearAllMocks();
  modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  modalRoot.remove();
});

describe('App', () => {
  it('renders ButtonsPanel', () => {
    render(<App />);

    expect(
      screen.getByRole('button', { name: /open controlled modal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /open uncontrolled modal/i })
    ).toBeInTheDocument();
  });

  it('renders Users List', () => {
    render(<App />);

    expect(screen.getByTestId('users-list')).toBeInTheDocument();
  });

  it('renders closed modal initially', () => {
    render(<App />);

    expect(
      screen.queryByRole('heading', { name: /add user \| controlled form/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });

  it('renders Controlled Form correctly', async () => {
    render(<App />);

    await userEvent.click(
      screen.getByRole('button', { name: /open controlled modal/i })
    );

    const heading = within(modalRoot).getByRole('heading', {
      name: /add user \| controlled form/i,
    });
    expect(heading).toBeInTheDocument();

    expect(screen.getByTestId('controlled-form')).toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(
      screen.queryByRole('heading', { name: /add user \| controlled form/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('controlled-form')).not.toBeInTheDocument();
  });

  it('renders Uncontrolled Form correctly', async () => {
    render(<App />);

    await userEvent.click(
      screen.getByRole('button', { name: /open uncontrolled modal/i })
    );

    expect(
      within(modalRoot).getByRole('heading', {
        name: /add user \| uncontrolled form/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();

    const overlay = modalRoot.querySelector(
      'div[tabindex="-1"]'
    ) as HTMLDivElement;
    expect(overlay).toBeTruthy();

    await userEvent.click(overlay);

    expect(
      screen.queryByRole('heading', { name: /add user \| uncontrolled form/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });
});
