import { NavLink } from 'react-router';

import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';

import { ROUTES } from '@/constants/routes';

export default function Header() {
  return (
    <header className="mb-8 flex items-center justify-between py-1">
      <div>
        <NavLink to={ROUTES.HOME}>
          <img
            src="/images/header-star-wars-logo.webp"
            alt="Star Wars Logo"
            className="h-10"
          />
        </NavLink>
      </div>
      <nav className="flex items-center gap-4">
        <ThemeSwitcher />
        <NavLink
          to={ROUTES.ABOUT}
          className={({ isActive }) =>
            `link text-xl ${isActive && 'link-active'}`
          }
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
