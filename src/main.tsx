import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { AppRoutes } from '@/routes/AppRoutes';
import { AppErrorBoundary } from '@/components/AppErrorBoundary';

import { ThemeProvider } from '@/contexts/theme';

import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AppErrorBoundary>
          <AppRoutes />
        </AppErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
