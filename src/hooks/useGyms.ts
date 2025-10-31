import { useQuery } from "@tanstack/react-query";
import { ApiResponse, Page, SortParam } from "@/types/api";
import { SafeParsedGym } from "../../services/publicService";

type GymFetchParams = {
  page: number;
  pageSize: number;
  sort?: SortParam[];
};

const fetchGyms = async (
  params: GymFetchParams
): Promise<ApiResponse<Page<SafeParsedGym>>> => {
  const safeSort = (params.sort || [])
    .filter(
      (s) =>
        typeof s.field === "string" && (s.order === "asc" || s.order === "desc")
    )
    .map((s) => ({ field: s.field.trim(), order: s.order }));

  const resp = await fetch(`/api/public/gyms`, {
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

  if (!resp.ok) throw new Error("Failed to fetch gyms");
  return resp.json();
};

export const useGyms = (
  page: number,
  pageSize: number,
  sort: SortParam[],
  initialData?: ApiResponse<Page<SafeParsedGym>>
) => {
  return useQuery({
    queryKey: ["gyms", page, sort],
    queryFn: () => fetchGyms({ page, pageSize, sort }),
    placeholderData: initialData,
    staleTime: 60_000, // cache for 1 minute
  });
};
