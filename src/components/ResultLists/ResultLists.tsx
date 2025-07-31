import { Loader } from '@/components/Loader';
import { PersonPreviewCard } from '@/components/PersonPreviewCard';
import { Flyout } from '@/components/Flyout';

import type { PersonPreview } from '@/types/person';

interface Props {
  people: PersonPreview[];
  loading: boolean;
}

export const ResultList = ({ people, loading }: Props) => {
  return (
    <div className="flex grow flex-col">
      {loading && <Loader />}

      {!loading && (
        <>
          {people.length > 0 ? (
            <>
              <h2 className="text-accent mb-2 text-2xl">Search Result</h2>

              <div className="flex grow flex-col gap-3">
                {people.map((person) => (
                  <PersonPreviewCard key={person.uid} person={person} />
                ))}
              </div>

              <Flyout />
            </>
          ) : (
            <p className="text-xl">
              No results found. Please try a different search.
            </p>
          )}
        </>
      )}
    </div>
  );
};
