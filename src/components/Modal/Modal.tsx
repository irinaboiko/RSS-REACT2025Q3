import { useEffect, useRef } from 'react';
import type { ReactNode, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { FORM_TYPES_LABELS, type FormType } from '@/types/forms';

import { getFocusable } from '@/utils';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  formType: FormType;
  closeModal: () => void;
  children: ReactNode;
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
      const focusable = getFocusable(contentRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
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
