import { Component } from 'react';
import type { PersonPreview } from '../../types/person.ts';

interface Props {
  person: PersonPreview;
}

class PersonPreviewCard extends Component<Props> {
  render() {
    const { person } = this.props;

    return (
      <div
        className="person-card min-w-[200px] flex-1 basis-[300px]"
        data-testid="person-preview-card"
      >
        <p>
          <span className="font-thin">id: </span>
          {person.uid}
        </p>
        <p>
          <span className="font-thin">person name: </span>
          {person.name}
        </p>
        <p>
          <span className="font-thin">find details at: </span>
          {person.url}
        </p>
      </div>
    );
  }
}

export default PersonPreviewCard;
