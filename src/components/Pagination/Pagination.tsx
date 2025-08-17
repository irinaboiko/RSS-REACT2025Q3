import { Link } from '@/i18n/navigation';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [k: string]: string | string[] | undefined };
}

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const normalize = (q: typeof searchParams, page: number) => {
    const entries = Object.entries(q).map(([k, v]) => [
      k,
      Array.isArray(v) ? v[0] : (v ?? ''),
    ]);
    const obj = Object.fromEntries(entries) as Record<string, string>;
    obj.page = String(page);
    return obj;
  };

  return (
    <div className="my-4 flex flex-wrap justify-center gap-3">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={{ pathname: '/', query: normalize(searchParams, page) }}
            className={`link text-xl ${isActive ? 'link-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            prefetch
          >
            {page}
          </Link>
        );
      })}
    </div>
  );
}
