import { Component } from 'react';

import Loader from './Loader.tsx';
import PersonPreviewCard from './PersonPreviewCard.tsx';

import type { PersonPreview } from '../types/person.ts';

interface Props {
  people: PersonPreview[];
  loading: boolean;
}

class ResultList extends Component<Props> {
  render() {
    const { people, loading } = this.props;

    return (
      <div className="h-full px-5 py-4">
        {!loading && people?.length !== 0 && <h2>Search Result</h2>}

        {loading && <Loader />}

        {!loading && people?.length === 0 && (
          <p className="text-2xl">
            No results found. Please try a different search.
          </p>
        )}

        <div className="flex flex-wrap">
          {people?.map((person: PersonPreview) => (
            <PersonPreviewCard key={person.uid} person={person} />
          ))}
        </div>
      </div>
    );
  }
}

export default ResultList;
