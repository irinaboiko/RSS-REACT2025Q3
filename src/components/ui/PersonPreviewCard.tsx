import type { PersonPreview } from '@/types/person';

interface Props {
  person: PersonPreview;
}

export const PersonPreviewCard = (props: Props) => {
  const { person } = props;

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
};
