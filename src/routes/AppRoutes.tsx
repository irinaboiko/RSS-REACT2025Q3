import { Navigate, Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts/MainLayout';
import { Home } from '@/pages/Home';
import { PersonDetails } from '@/components/PersonDetails';
import { About } from '@/pages/About';
import { NotFound } from '@/pages/NotFound';

import { ROUTES } from '@/constants/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />}>
          <Route path={ROUTES.DETAILS} element={<PersonDetails />} />
        </Route>

        <Route path={ROUTES.ABOUT} element={<About />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
