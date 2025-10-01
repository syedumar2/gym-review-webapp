import { Button } from "../ui/button";

const PaginationStatic = () => {
  // Static pages for display
  const pages = [1, 2, 3, "...", 10];

  return (
    <div className="flex items-center gap-2">
      {/* Previous button */}
      <Button className="hover:cursor-pointer bg-gray-200 text-black" disabled>
        Previous
      </Button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 py-1 text-white">
            ...
          </span>
        ) : (
          <Button
            key={idx}
            className={`hover:cursor-pointer ${
              page === 2 ? "bg-red-600 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {page}
          </Button>
        )
      )}

      {/* Next button */}
      <Button className="hover:cursor-pointer bg-gray-200 text-black">
        Next
      </Button>
    </div>
  );
};

export default PaginationStatic;
