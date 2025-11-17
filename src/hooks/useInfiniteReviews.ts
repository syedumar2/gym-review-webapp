import { ApiResponse, Page } from "@/types/api";
import { ReviewSearch, ReviewSortParams, ReviewWithUserAndVotes } from "@/types/review";
import { ReviewFilters } from "../../services/publicService";
import { useInfiniteQuery } from "@tanstack/react-query";


type ReviewsFetchParams = {
    gymId: number;
    page: number;
    pageSize: number;
    search?: ReviewSearch;
    sort?: ReviewSortParams[];
    filters?: ReviewFilters;
};
const fetchReviews = async (
    params: ReviewsFetchParams
): Promise<ApiResponse<Page<ReviewWithUserAndVotes>>> => {
    const safeSort = (params.sort || [])
        .filter(
            (s) =>
                typeof s.field === "string" &&
                (s.order === "asc" || s.order === "desc")
        )
        .map((s) => ({
            field: s.field.trim(),
            order: s.order,
        }));
    const resp = await fetch(`/api/public/gyms/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            gymId: params.gymId,
            page: params.page,
            pageSize: params.pageSize,
            search: params.search ?? undefined,
            filters: params.filters ?? undefined,
            sort: safeSort.length
                ? safeSort
                : [{ field: "createdAt", order: "asc" }], // default sort
        }),
    });
    const result = await resp.json();


    if (result?.data?.data) {
        result.data.data = result.data.data.map((req: any) => ({
            ...req,
            createdAt: new Date(req.createdAt),
            updatedAt: new Date(req.updatedAt)
        }));
    }

    return result;
}

export const useInfiniteReviews = (
    gymId: number,
    pageSize: number,

    sort: ReviewSortParams[],
    filters: ReviewFilters,
    initialData?: ApiResponse<Page<ReviewWithUserAndVotes>>,
      search?: ReviewSearch,
) => {
    return useInfiniteQuery({
        queryKey: ["reviews", sort, filters],
        queryFn: ({ pageParam }) =>
            fetchReviews({
                gymId,
                page: pageParam,
                pageSize: pageSize,
                search,
                filters,
                sort: sort as ReviewSortParams[],
            }),
        placeholderData: {
            pages: [initialData],
            pageParams: [1],
        },
        staleTime: 60_000, // cache for 1 minute
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage?.data?.hasMore ? lastPage.data.nextPage : undefined,
    });
}