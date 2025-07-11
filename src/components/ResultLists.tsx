import { Component } from 'react';

import Loader from './ui/Loader.tsx';
import PersonPreviewCard from './ui/PersonPreviewCard.tsx';

import type { PersonPreview } from '../types/person.ts';

interface Props {
  people: PersonPreview[];
  loading: boolean;
}

class ResultList extends Component<Props> {
  render() {
    const { people, loading } = this.props;

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
  }
}

export default ResultList;
