'use client';

import { selectPerson, unselectPerson } from '@/store/selectedPeopleSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { PersonPreview } from '@/types/person';
import { Link } from '@/i18n/navigation';

export interface PersonPreviewCardProps {
  person: PersonPreview;
}

export default function PersonPreviewCard({ person }: PersonPreviewCardProps) {
  // const location = useLocation();
  //
  const selectedPeople = useAppSelector((state) => state.selectedPeople.people);
  const dispatch = useAppDispatch();
  //
  const isSelected = selectedPeople.some(
    (p: PersonPreview): boolean => p.uid === person.uid
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectPerson(person));
    } else {
      dispatch(unselectPerson(person));
    }
  };

  return (
    <div className="person-preview-card">
      {/*<Link*/}
      {/*  href={`details/${person.uid}`}*/}
      {/*  // href={`details/${person.uid}${location.search}`}*/}
      {/*  className={'person-preview-card'}*/}
      {/*  // className={'person-preview-card person-preview-card-active'}*/}
      {/*>*/}
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-zinc-400"
        checked={isSelected}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
      />
      <p>
        {person.uid} - {person.name}
      </p>

      {/*</Link>*/}
    </div>
  );
}
