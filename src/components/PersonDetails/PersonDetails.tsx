import { useLocation, useNavigate, useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';

import { Loader } from '@/components/Loader';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { useGetPersonByIdQuery } from '@/services';
import { getErrorMessage, renderPersonProperties } from '@/utils';
import { ROUTES } from '@/constants/routes';
import { TEST_IDS } from '@/__tests__/testConstants';

const { PERSON_DETAILS_NAME } = TEST_IDS;

export const PersonDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { detailsId } = useParams();

  const { data, isFetching, isLoading, isError, error, refetch } =
    useGetPersonByIdQuery(detailsId ?? skipToken);

  const handleRefresh = () => {
    refetch();
  };

  const handleDetailsClose = () => {
    navigate(`${ROUTES.HOME}${location.search}`);
  };

  const personProps = data ? renderPersonProperties(data.properties) : null;

  return (
    <div className="relative ml-4 flex-1 border-l-1 border-zinc-400">
      {isFetching && <Loader />}

      {!isLoading && (
        <div className="px-4 py-2">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleRefresh}
              aria-label="refresh"
              className="btn btn-gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </button>
            <button
              onClick={handleDetailsClose}
              aria-label="close"
              className="btn btn-gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isError ? (
            <ApiErrorMessage errorMessage={getErrorMessage(error)} />
          ) : (
            <>
              <h2
                className="text-accent text-2xl"
                data-testid={PERSON_DETAILS_NAME}
              >
                {data?.properties?.name}
              </h2>

              {data?.description && (
                <p className="text-base">{data.description}</p>
              )}

              <div className="mt-3">{personProps}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
