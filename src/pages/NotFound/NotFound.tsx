import { useNavigate } from 'react-router';

import { ROUTES } from '@/constants/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-1">
        <span className="text-9xl">4</span>
        <img
          src="/images/404-millennium-falcon.webp"
          alt="0"
          className="h-24"
        />
        <span className="text-9xl">4</span>
      </div>
      <p className="text-2xl">
        Looks like this page made the jump to hyperspace.
      </p>
      <button onClick={handleGoHome} className="btn btn-gray">
        Go Home
      </button>
    </div>
  );
};
