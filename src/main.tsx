import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Home } from '@/pages/Home';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';

import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <StrictMode>
    <AppErrorBoundary>
      <Home />
    </AppErrorBoundary>
  </StrictMode>
);
