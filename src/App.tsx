import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import AppErrorBoundary from '@/components/AppErrorBoundary/AppErrorBoundary';
import AppRoutes from '@/routes/AppRoutes';

import { store } from '@/store';
import { ThemeProvider } from '@/contexts/theme/ThemeProvider';

// import '@/app/globals.css';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <AppErrorBoundary>
            <AppRoutes />
          </AppErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
