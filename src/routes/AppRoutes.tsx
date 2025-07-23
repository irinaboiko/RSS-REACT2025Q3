import { Route, Routes } from 'react-router';

import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { NotFound } from '@/pages/NotFound';
import { MainLayout } from '@/layouts/MainLayout';

import { ROUTES } from '@/constants/routes';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.ABOUT} element={<About />} />
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
};
