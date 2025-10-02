import { Button } from "../ui/button";

const PaginationStatic = () => {
  // Static pages for display
  const pages = [1, 2, 3, "...", 10];

  return (
    <div className="flex items-center gap-2">
      {/* Previous button */}
      <Button className="hover:cursor-pointer bg-secondary text-white" disabled>
        Previous
      </Button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 py-1 text-black">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            className={`hover:cursor-pointer ${
              page === 2 ? "bg-black text-white" : "bg-secondary text-white"
            }`}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button className="hover:cursor-pointer bg-secondary text-white">
        Next
      </Button>
    </div>
  );
};

export default PaginationStatic;
