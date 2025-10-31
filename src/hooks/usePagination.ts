import { useState } from "react";

/**
 * A reusable pagination hook.
 * Handles current page, total pages, and page change logic.
 */
export const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);

  const nextPage = (totalPages?: number) => {
    setPage((prev) => (totalPages ? Math.min(prev + 1, totalPages) : prev + 1));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const resetPage = () => setPage(initialPage);

  return {
    page,
    setPage,
    nextPage,
    prevPage,
    resetPage,
  };
};
