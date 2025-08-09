import { RESULTS_PER_PAGE } from '@/constants/common';
import type { PersonPreview } from '@/types/person';

export interface UsePaginationMetaProps {
  isSearching: boolean;
  currentPage: number;
  searchedData?: PersonPreview[];
  allPeopleData?: {
    data: PersonPreview[];
    totalPages: number;
  };
}

export const usePaginationMeta = ({
  isSearching,
  currentPage,
  searchedData,
  allPeopleData,
}: UsePaginationMetaProps) => {
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const endIndex = currentPage * RESULTS_PER_PAGE;

  const people = isSearching
    ? (searchedData?.slice(startIndex, endIndex) ?? [])
    : (allPeopleData?.data ?? []);

  const totalPages = isSearching
    ? Math.ceil((searchedData?.length ?? 0) / RESULTS_PER_PAGE)
    : (allPeopleData?.totalPages ?? 1);

  return { people, totalPages };
};
