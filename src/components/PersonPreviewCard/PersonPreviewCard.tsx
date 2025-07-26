import { NavLink, useLocation } from 'react-router';

import type { PersonPreview } from '@/types/person';

interface Props {
  person: PersonPreview;
}

export const PersonPreviewCard = ({ person }: Props) => {
  const location = useLocation();

  return (
    <NavLink
      to={`details/${person.uid}${location.search}`}
      data-testid="person-preview-card"
      className={({ isActive }) =>
        `person-preview-card ${isActive && 'person-preview-card-active'}`
      }
    >
      <p>
        {person.uid} - {person.name}
      </p>
    </NavLink>
  );
};
