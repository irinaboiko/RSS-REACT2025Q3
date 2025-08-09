import { NavLink, useLocation } from 'react-router';

import { selectPerson, unselectPerson } from '@/store/selectedPeopleSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import type { PersonPreview } from '@/types/person';

export interface PersonPreviewCardProps {
  person: PersonPreview;
}

export const PersonPreviewCard = ({ person }: PersonPreviewCardProps) => {
  const location = useLocation();

  const selectedPeople = useAppSelector((state) => state.selectedPeople.people);
  const dispatch = useAppDispatch();

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
    <NavLink
      to={`details/${person.uid}${location.search}`}
      data-testid="person-preview-card"
      className={({ isActive }) =>
        `person-preview-card ${isActive && 'person-preview-card-active'}`
      }
    >
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
    </NavLink>
  );
};
