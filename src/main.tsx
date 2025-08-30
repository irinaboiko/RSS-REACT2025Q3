import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { Loader } from '@/components/Loader';

import { YearSelectionProvider } from '@/providers/yearSelectionProvider';
import { SelectedColumnsProvider } from '@/providers/selectedColumnsProvider';
import { ColumnsSortProvider } from '@/providers/columnsSortProvider';
import { SearchBarProvider } from '@/providers/searchBarProvider';

import '@/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <Suspense fallback={<Loader />}>
    <YearSelectionProvider>
      <SelectedColumnsProvider>
        <SearchBarProvider>
          <ColumnsSortProvider>
            <App />
          </ColumnsSortProvider>
        </SearchBarProvider>
      </SelectedColumnsProvider>
    </YearSelectionProvider>
  </Suspense>
);
