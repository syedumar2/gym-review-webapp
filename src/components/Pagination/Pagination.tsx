import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number | null | undefined;
  className: string;
  totalPages: number | null | undefined;
  onPageChange: (page: number) => void;
  maxVisible?: number; // max number of page buttons to show around current page
}

const Pagination = ({
  className,
  currentPage,
  totalPages,
  maxVisible = 2,
  onPageChange,
}: PaginationProps) => {
  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages && currentPage) {
      for (let i = 1; i <= totalPages; i++) {
        if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - maxVisible && i <= currentPage + maxVisible)
        ) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== "...") {
          pages.push("...");
        }
      }
    }
    return pages;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Previous button */}
      <Button
        className="hover:cursor-pointer bg-secondary text-white disabled:opacity-50 "
        variant={"secondary"}
        size={undefined}
        disabled={currentPage === 1}
        onClick={() =>
          currentPage != null && onPageChange(Math.max(currentPage - 1, 1))
        }
      >
        Previous
      </Button>

      {/* Page numbers */}
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 py-1 text-gray">
            ...
          </span>
        ) : (
          <div key={idx}>
            <div className={page === currentPage ? "flex flex-col items-center mt-1 " : ""}>
              <Button
                key={idx}
                onClick={() => typeof page === "number" && onPageChange(page)}
                className={`hover:cursor-pointer  ${
                  page === currentPage
                    ? "bg-secondary text-white " // active page
                    : "bg-secondary text-white" // inactive
                }`}
                variant={"secondary"}
                size={undefined}
              >
                {page}
              </Button>
              <div
                className={
                  page === currentPage
                    ? " bg-secondary border-t-secondary w-8 h-0.5 mt-1   "
                    : "hidden"
                }
              ></div>
            </div>
          </div>
        )
      )}

      {/* Next button */}
      <Button
        className="hover:cursor-pointer bg-secondary text-white disabled:opacity-50 "
        variant={"secondary"}
        size={undefined}
        disabled={currentPage === totalPages}
        onClick={() =>
          currentPage != null &&
          totalPages != null &&
          onPageChange(Math.min(currentPage + 1, totalPages))
        }
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
