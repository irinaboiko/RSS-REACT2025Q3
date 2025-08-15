import { Navigate, Route, Routes } from 'react-router';

import { MainLayout } from '@/layouts/MainLayout/MainLayout';
import Home from '@/pages/Home/Home';
import PersonDetails from '@/components/PersonDetails/PersonDetails';
import NotFound from '@/pages/NotFound/404';

import { ROUTES } from '@/constants/routes';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />}>
          <Route path={ROUTES.DETAILS} element={<PersonDetails />} />
        </Route>
      </Route>

      <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
