interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) return null;

  return (
    <div className="my-4 flex flex-wrap justify-center gap-3">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            className={`link text-xl ${page === currentPage && 'link-active'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
