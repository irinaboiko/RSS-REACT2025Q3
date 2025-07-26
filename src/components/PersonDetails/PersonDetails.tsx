import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

import { Loader } from '@/components/Loader';
import { ApiErrorMessage } from '@/components/ApiErrorMessage';

import { fetchPersonDetails } from '@/api';
import type { FullPerson } from '@/types/person';
import { renderPersonProperties } from '@/utils/renderPersonProperties';

import { ROUTES } from '@/constants/routes';
import { TEST_IDS } from '@/__tests__/testConstants';

const { PERSON_DETAILS_NAME } = TEST_IDS;

export const PersonDetails = () => {
  const [personDetails, setPersonDetails] = useState<FullPerson>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const params = useParams();
  const personId = params.detailsId
    ? parseInt(params.detailsId, 10)
    : undefined;

  useEffect(() => {
    const loadPersonDetails = () => {
      setLoading(true);
      setError(null);

      fetchPersonDetails(personId as number)
        .then((data) => {
          setPersonDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    };

    loadPersonDetails();
  }, [personId]);

  const handleDetailsClose = () => {
    navigate(`${ROUTES.HOME}${location.search}`);
  };

  const personProps = personDetails
    ? renderPersonProperties(personDetails.properties)
    : null;

  return (
    <div className="relative ml-4 flex-1 border-l-1 border-zinc-400">
      {loading && <Loader />}

      {!loading && error && <ApiErrorMessage errorMessage={error} />}

      {!loading && personDetails && (
        <div className="relative px-4 py-2">
          <button
            onClick={handleDetailsClose}
            aria-label="close"
            className="link group absolute top-2 right-2 z-60 h-8 w-8 cursor-pointer rounded-full border border-gray-800 transition hover:rotate-90 hover:border-yellow-700"
          >
            <span className="absolute top-1/2 left-1/2 h-[1px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-800 group-hover:bg-yellow-700"></span>
            <span className="absolute top-1/2 left-1/2 h-[1px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-800 group-hover:bg-yellow-700"></span>
          </button>

          <h2
            className="text-accent text-2xl"
            data-testid={PERSON_DETAILS_NAME}
          >
            {personDetails?.properties?.name}
          </h2>

          {personDetails?.description && (
            <p className="text-base">{personDetails.description}</p>
          )}

          <div className="mt-3">{personProps}</div>
        </div>
      )}
    </div>
  );
};
