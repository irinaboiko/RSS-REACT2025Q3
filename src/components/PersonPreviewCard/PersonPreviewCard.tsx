'use client';

import { selectPerson, unselectPerson } from '@/store/selectedPeopleSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { PersonPreview } from '@/types/person';

export interface PersonPreviewCardProps {
  person: PersonPreview;
}

export default function PersonPreviewCard({ person }: PersonPreviewCardProps) {
  const selectedPeople = useAppSelector((state) => state.selectedPeople.people);
  const dispatch = useAppDispatch();

  const isSelected = selectedPeople.some(
    (p: PersonPreview): boolean => p.uid === person.uid
  );

  const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectPerson(person));
    } else {
      dispatch(unselectPerson(person));
    }
  };

  return (
    <div className={'person-preview-card'}>
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-zinc-400"
        checked={isSelected}
        onChange={handleSelectionChange}
        onClick={(e) => e.stopPropagation()}
      />
      <p>
        {person.uid} - {person.name}
      </p>
    </div>
  );
}
