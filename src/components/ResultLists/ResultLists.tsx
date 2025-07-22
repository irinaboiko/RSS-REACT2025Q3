import { Loader } from '@/components/Loader';
import { PersonPreviewCard } from '@/components/PersonPreviewCard';

import type { PersonPreview } from '@/types/person';

interface Props {
  people: PersonPreview[];
  loading: boolean;
}

export const ResultList = (props: Props) => {
  const { people, loading } = props;

  return (
    <>
      {loading && <Loader />}

      {!loading && (
        <>
          {people.length > 0 ? (
            <>
              <h2 className="mb-2 text-xl">Search Result</h2>
              <div className="flex flex-wrap gap-3">
                {people.map((person) => (
                  <PersonPreviewCard key={person.uid} person={person} />
                ))}
              </div>
            </>
          ) : (
            <p className="text-2xl font-thin">
              No results found. Please try a different search.
            </p>
          )}
        </>
      )}
    </>
  );
};
