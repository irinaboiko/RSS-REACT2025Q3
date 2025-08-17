import ResultList from '@/components/ResultList/ResultList';
import { fetchAllPeople } from '@/services/people';

export default async function ListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page || 1);
  const data = await fetchAllPeople(page);

  return (
    <>
      <ResultList people={data.people}></ResultList>
    </>
  );
}
