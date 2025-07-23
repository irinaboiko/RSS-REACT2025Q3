import { NavLink } from 'react-router';

import { ROUTES } from '@/constants/routes';

import { TEST_IDS } from '@/__tests__/testConstants';

export const Header = () => {
  return (
    <header
      className="mb-8 flex items-center justify-between py-1"
      data-testid={TEST_IDS.HEADER}
    >
      <div>
        <NavLink to={ROUTES.HOME}>
          <img
            src="/images/header-star-wars-logo.webp"
            alt="Star Wars Logo"
            className="h-10"
          />
        </NavLink>
      </div>
      <nav>
        <NavLink
          to={ROUTES.ABOUT}
          className={({ isActive }) =>
            isActive ? 'active-link' : 'hover:text-yellow-600 hover:underline'
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};
