import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Page, SortParam } from "@/types/api";
import { GymRequest } from "@/generated/prisma";

export type ParsedGymRequest = GymRequest & {
  user: { name: string };
  address: { city: string };
};

type GymRequestsFetchParams = {
  page: number;
  pageSize: number;
  sort?: SortParam[];
};

/**
 * Fetches gym requests with pagination and sorting for admin view.
 * Automatically integrates with React Query for caching and loading states.
 */
async function fetchGymRequests(
  params: GymRequestsFetchParams
): Promise<ApiResponse<Page<ParsedGymRequest>>> {
  const safeSort = (params.sort || [])
    .filter(
      (s) =>
        typeof s.field === "string" && (s.order === "asc" || s.order === "desc")
    )
    .map((s) => ({ field: s.field.trim(), order: s.order }));

  const resp = await fetch(`/api/admin/gym-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      page: params.page,
      pageSize: params.pageSize,
      sort: safeSort.length
        ? safeSort
        : [{ field: "createdAt", order: "desc" }],
    }),
  });

  const result = await resp.json();

  // Parse date field into Date objects
  if (result?.data?.data) {
    result.data.data = result.data.data.map((req: any) => ({
      ...req,
      createdAt: new Date(req.createdAt),
    }));
  }

  return result;
}

export function useGymRequests(page: number, sortParams: SortParam[]) {
  return useQuery({
    queryKey: ["adminGymRequests", page, sortParams],
    queryFn: () =>
      fetchGymRequests({
        page,
        pageSize: 10,
        sort: sortParams,
      }),
  });
}
