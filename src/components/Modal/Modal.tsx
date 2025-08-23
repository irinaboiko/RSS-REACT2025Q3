import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { FORM_TYPES_LABELS, type FormType } from '@/types/forms';
import { clsx } from 'clsx';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  formType: FormType;
  closeModal: () => void;
  children: ReactNode;
}

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selectors));
  return nodes.filter(
    (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
  );
}

export const Modal = ({
  isOpen,
  title,
  formType,
  closeModal,
  children,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;

    modal?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      closeModal();
    }

    if (event.key === 'Tab') {
      const focusables = getFocusable(contentRef.current);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (
        event.shiftKey &&
        (active === first || !contentRef.current?.contains(active))
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (active === last || !contentRef.current?.contains(active))
      ) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const content = (
    <div
      ref={modalRef}
      tabIndex={-1}
      onClick={closeModal}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative mx-2 h-full max-h-[95%] w-full max-w-3xl overflow-y-scroll rounded-lg border-2 bg-stone-50 p-4"
      >
        <button
          role="button"
          aria-label="Close modal"
          onClick={closeModal}
          className="absolute top-1 right-1"
        >
          <XMarkIcon
            className={clsx(
              'w-8 cursor-pointer',
              formType === 'controlled'
                ? 'hover:text-cyan-500'
                : 'hover:text-amber-400'
            )}
          />
        </button>
        <h2 id="modal-title" className="text-2xl">
          {title} | {FORM_TYPES_LABELS[formType]} Form
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, modalRoot);
};
