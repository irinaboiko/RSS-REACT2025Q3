import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
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

export const Modal = ({
  isOpen,
  title,
  formType,
  closeModal,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  const content = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative mx-2 w-full max-w-3xl rounded-lg border-2 bg-stone-50 p-4">
        <button onClick={closeModal} className="absolute top-1 right-1">
          <XMarkIcon
            className={clsx(
              'w-8 cursor-pointer',
              formType === 'controlled'
                ? 'hover:text-cyan-500'
                : 'hover:text-amber-400'
            )}
          />
        </button>
        <h2 className="text-2xl">
          {title} | {FORM_TYPES_LABELS[formType]} Form
        </h2>
        <div>{children}</div>
        <div className="my-2 flex justify-center">
          <button
            className={clsx(
              'cursor-pointer rounded-lg border-2 p-2',
              formType === 'controlled'
                ? 'hover:border-cyan-500'
                : 'hover:border-amber-400'
            )}
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(content, modalRoot);
};
