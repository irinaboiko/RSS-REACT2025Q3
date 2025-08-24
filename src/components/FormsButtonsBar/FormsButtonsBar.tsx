import type { FormType } from '@/types/forms';

export interface FormsButtonsBarProps {
  openModal: (formType: FormType) => void;
}

export const FormsButtonsBar = ({ openModal }: FormsButtonsBarProps) => {
  return (
    <div className="mb-3 flex items-center justify-center gap-4">
      <button
        onClick={() => openModal('controlled')}
        className="cursor-pointer rounded-lg border-2 p-2 hover:border-cyan-500"
      >
        Open Controlled Modal
      </button>
      <button
        onClick={() => openModal('uncontrolled')}
        className="cursor-pointer rounded-lg border-2 p-2 hover:border-amber-400"
      >
        Open Uncontrolled Modal
      </button>
    </div>
  );
};
