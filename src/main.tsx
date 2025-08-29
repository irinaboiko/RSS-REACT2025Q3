import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import { Loader } from '@/components/Loader';

import '@/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </StrictMode>
);
