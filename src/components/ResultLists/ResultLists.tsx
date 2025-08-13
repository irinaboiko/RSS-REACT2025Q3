import Loader from '@/components/Loader/Loader';
import PersonPreviewCard from '@/components/PersonPreviewCard/PersonPreviewCard';
import Flyout from '@/components/Flyout/Flyout';

import type { PersonPreview } from '@/types/person';

export interface ResultListProps {
  people: PersonPreview[];
  loading: boolean;
}

export default function ResultList({ people, loading }: ResultListProps) {
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
}
