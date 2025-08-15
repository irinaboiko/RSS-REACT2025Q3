import PersonDetails from '@/components/PersonDetails/PersonDetails';
import { FullPerson } from '@/types/person';
import { renderPersonProperties } from '@/utils';

export async function generateStaticParams() {
  const people = [{ id: '1' }, { id: '2' }];

  return people.map((person) => ({
    id: person.id,
  }));
}

export default async function DetailPage({ params }) {
  const data: FullPerson = {
    properties: {
      created: '2025-07-23T16:37:44.996Z',
      edited: '2025-07-23T16:37:44.996Z',
      name: 'Luke Skywalker',
      gender: 'male',
      skin_color: 'fair',
      hair_color: 'blond',
      height: '172',
      eye_color: 'blue',
      mass: '77',
      homeworld: 'https://www.swapi.tech/api/planets/1',
      birth_year: '19BBY',
      url: 'https://www.swapi.tech/api/people/1',
    },
    _id: '5f63a36eee9fd7000499be42',
    description: 'A person within the Star Wars universe',
    uid: '1',
    __v: 2,
  };

  // TODO fetch data
  // const data = await fetchItemById(params.id);

  const personProps = data ? renderPersonProperties(data.properties) : null;

  return (
    <div className="relative ml-4 flex-1 border-l-1 border-zinc-400">
      <div className="px-4 py-2">
        <h2 className="text-accent text-2xl">{data?.properties?.name}</h2>

        {data?.description && <p className="text-base">{data.description}</p>}

        <div className="mt-3">{personProps}</div>
      </div>
    </div>
  );
}
