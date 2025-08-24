import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from './Modal';
import { getFocusable } from '@/utils';

vi.mock('@/types/forms', () => ({
  FORM_TYPES_LABELS: { controlled: 'Controlled', uncontrolled: 'Uncontrolled' },
}));

vi.mock('@/utils', () => ({
  getFocusable: vi.fn(() => []),
}));

let modalRoot: HTMLDivElement;

beforeEach(() => {
  vi.clearAllMocks();
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterEach(() => {
  modalRoot?.remove();
});

function renderOpenModal({
  title = 'Create user',
  formType = 'controlled' as const,
  closeModal = vi.fn(),
  children = <div>Body</div>,
} = {}) {
  const utils = render(
    <Modal isOpen title={title} formType={formType} closeModal={closeModal}>
      {children}
    </Modal>
  );
  return { closeModal, ...utils };
}

describe('Modal', () => {
  it('shows title and content', () => {
    const { container } = renderOpenModal();

    expect(container).toBeTruthy();

    expect(
      screen.getByRole('heading', { name: /create user \| controlled form/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('closes on Close button click', async () => {
    const closeModal = vi.fn();
    render(
      <Modal
        isOpen
        title="Create user"
        formType="controlled"
        closeModal={closeModal}
      >
        Body
      </Modal>
    );

    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('closes on Esc', async () => {
    const closeModal = vi.fn();
    renderOpenModal({ closeModal });

    await userEvent.keyboard('{Escape}');

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('closes on Overlay click', async () => {
    const closeModal = vi.fn();
    renderOpenModal({ closeModal });

    const dialog = screen.getByRole('dialog');
    await userEvent.click(dialog);
    expect(closeModal).not.toHaveBeenCalled();

    const overlay = modalRoot.querySelector(
      'div[tabindex="-1"]'
    ) as HTMLDivElement;
    expect(overlay).toBeTruthy();

    await userEvent.click(overlay);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('renders in react portal', () => {
    renderOpenModal({ title: 'Portal check' });

    const headingInPortal = within(modalRoot).getByRole('heading', {
      name: /portal check \| controlled form/i,
    });
    expect(headingInPortal).toBeInTheDocument();

    expect(document.getElementById('modal-root')).toBeTruthy();
  });

  it('prevents default when Tab pressed and no focusable elements', () => {
    renderOpenModal({ children: <div /> });

    const overlay = modalRoot.querySelector(
      'div[tabindex="-1"]'
    ) as HTMLDivElement;
    const e = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    overlay.dispatchEvent(e);

    expect(e.defaultPrevented).toBe(true);
  });

  it('focuses from first to last on Shift+Tab', () => {
    renderOpenModal({
      children: (
        <>
          <button data-testid="first">First</button>
          <button data-testid="middle">Middle</button>
          <button data-testid="last">Last</button>
        </>
      ),
    });

    const dialog = screen.getByRole('dialog');
    const first = dialog.querySelector(
      '[data-testid="first"]'
    ) as HTMLButtonElement;
    const last = dialog.querySelector(
      '[data-testid="last"]'
    ) as HTMLButtonElement;

    vi.mocked(getFocusable).mockReturnValue([first, last]);

    first.focus();
    expect(document.activeElement).toBe(first);

    const overlay = modalRoot.querySelector(
      'div[tabindex="-1"]'
    ) as HTMLDivElement;
    const e = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    overlay.dispatchEvent(e);

    expect(document.activeElement).toBe(last);
  });

  it('focuses from last to first on Tab', () => {
    renderOpenModal({
      children: (
        <>
          <button data-testid="first">First</button>
          <button data-testid="last">Last</button>
        </>
      ),
    });

    const dialog = screen.getByRole('dialog');
    const first = dialog.querySelector(
      '[data-testid="first"]'
    ) as HTMLButtonElement;
    const last = dialog.querySelector(
      '[data-testid="last"]'
    ) as HTMLButtonElement;

    vi.mocked(getFocusable).mockReturnValue([first, last]);

    last.focus();
    expect(document.activeElement).toBe(last);

    const overlay = modalRoot.querySelector(
      'div[tabindex="-1"]'
    ) as HTMLDivElement;
    const e = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true,
    });
    overlay.dispatchEvent(e);

    expect(document.activeElement).toBe(first);
  });
});
