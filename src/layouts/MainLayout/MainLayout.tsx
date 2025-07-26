import { Outlet } from 'react-router';

import { Header } from '@/components/Header';

import { TEST_IDS } from '@/__tests__/testConstants';

export const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col px-5 py-4">
      <Header />
      <main className="flex h-full grow flex-col" data-testid={TEST_IDS.MAIN}>
        <Outlet />
      </main>
    </div>
  );
};
