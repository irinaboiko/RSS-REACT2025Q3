import { Component } from 'react';
import type { Person } from '../types/person.ts';
import Loader from './Loader.tsx';

interface Props {
  people: Person[];
  loading: boolean;
}

interface State {}

class ResultList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { people, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <div className="flex flex-wrap">
        {people.map((person: Person) => (
          <div key={person.name} className="person-card min-w-[200px] flex-1">
            <p>{person.name}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultList;
