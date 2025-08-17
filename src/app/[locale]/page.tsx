import { Suspense } from 'react';
import Loading from '@/app/[locale]/loading';

import ResultList from '@/components/ResultList/ResultList';
import Pagination from '@/components/Pagination/Pagination';

import { fetchAllPeople } from '@/services/people';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const currentPage = Number(sp.page ?? 1);
  const { people, totalPages } = await fetchAllPeople(currentPage);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ResultList people={people}></ResultList>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={sp}
        />
      </Suspense>
    </>
  );
}
