import { useState } from 'react';

import { FormsButtonsBar } from '@/components/FormsButtonsBar';
import { UsersList } from '@/components/UsersList';
import { Modal } from '@/components/Modal';

import useModal from '@/hooks/useModal';
import type { FormType } from '@/types/forms';
import { FormControlled } from '@/components/FormControlled';
import { FormUncontrolled } from '@/components/FormUncontrolled';

function App() {
  const [formType, setFormType] = useState<FormType>('controlled');
  const { isOpen, openModal, closeModal } = useModal();

  function handleModalOpen(formType: FormType) {
    setFormType(formType);
    openModal();
  }

  return (
    <>
      <FormsButtonsBar openModal={handleModalOpen} />

      <UsersList />

      <Modal
        isOpen={isOpen}
        title="Add User"
        formType={formType}
        closeModal={closeModal}
      >
        {formType === 'controlled' ? (
          <FormControlled />
        ) : (
          <FormUncontrolled closeModal={closeModal} />
        )}
      </Modal>
    </>
  );
}

export default App;
