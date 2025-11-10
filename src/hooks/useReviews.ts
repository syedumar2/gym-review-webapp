import { Review } from "@/generated/prisma";
import { ApiResponse, Page } from "@/types/api";
import { ReviewSearch, ReviewSortParams } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import { ReviewFilters } from "../../services/publicService";


type ReviewFetchParams = {
    gymId: number;
    page: number,
    pageSize: number,
    search: ReviewSearch,
    sort: ReviewSortParams[],
    filters: ReviewFilters,
}


const fetchReviews = async (
    params: ReviewFetchParams
): Promise<ApiResponse<Page<Review>>> => {
    const { filters, gymId, page, pageSize, search,
        sort
    } = params;
    const resp = await fetch(`/api/public/gyms/reviews`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            gymId,
            page,
            pageSize,
            search,
            sort,
            filters
        }),
    });
    const data = await resp.json();

    if (!resp.ok) {
        console.error("Review api Error:", data.message);
        throw new Error(data.message);
    } return data;
}

export const useReviews = (
    gymId: number,
    page: number,
    pageSize: number,
    search: ReviewSearch,
    sort: ReviewSortParams[],
    filters: ReviewFilters,
    initialData?: ApiResponse<Page<Review>>

) => {
    return useQuery(
        {
            queryKey: ["reviews", gymId, page, sort, filters, search],
            queryFn: () => fetchReviews({
                gymId,
                page,
                pageSize,
                search,
                sort,
                filters,
            }),
            placeholderData: initialData,
            staleTime: 60_000,
        }
    )
};