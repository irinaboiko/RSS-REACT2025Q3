import { Outlet } from 'react-router';

import Header from '@/components/Header/Header';

export const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col px-5 py-4">
      <Header />
      <main className="flex h-full grow flex-col">
        <Outlet />
      </main>
    </div>
  );
};
