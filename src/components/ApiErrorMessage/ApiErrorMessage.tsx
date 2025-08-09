import { TEST_IDS } from '@/__tests__/testConstants';

const { API_ERROR_MESSAGE } = TEST_IDS;

export interface ApiErrorMessageProps {
  errorMessage?: string;
}

export const ApiErrorMessage = ({
  errorMessage = 'Unknown error occurred',
}: ApiErrorMessageProps) => {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-4"
      data-testid={API_ERROR_MESSAGE}
    >
      <img src="/images/error-r2d2.webp" alt="Error" className="h-56" />
      <h2 className="text-xl font-bold text-red-600">
        Oops! An Error Occurred
      </h2>
      <p>{errorMessage}</p>
      <p>Please, try later</p>
    </div>
  );
};
