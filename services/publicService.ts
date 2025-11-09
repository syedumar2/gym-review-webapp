import { $Enums, Gym, Prisma, Review } from "@/generated/prisma/client";
import { Page, SearchParam, SortParam } from "@/types/api";
import prisma from "../lib/prisma";

export type SafeParsedGym = Omit<Gym, "rating"> & {
    rating: number | null;
};

export type GymFilters = {
    city?: string;
    state?: string;
    gymType?: $Enums.GymType;
    genderSegregation?: $Enums.GenderSegregation;
    minRating?: number;
    maxRating?: number;
    amenities?: $Enums.Amenity[];
}



export type ReviewFilters = {
    minRating?: number;
    maxRating?: number;
    createdBefore: string;
    createdAfter: string;

}

export const getGymById = async (id: number): Promise<Gym> => {
    const gym = await prisma.gym.findFirst({ where: { id } });
    if (!gym) throw new Error(`No gym with id: ${id} found!`);
    return gym;

}

export const getAllGyms = async (
    page: number,
    pageSize: number,
    search: SearchParam | undefined,
    sort: SortParam[],
    filters: GymFilters
): Promise<Page<SafeParsedGym>> => {
    const MAX_PAGE_SIZE = 50;
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);

    const validColumns: (keyof Prisma.GymOrderByWithRelationInput)[] = [
        "gymName",
        "city",
        "state",
        "gymType",
        "description"
    ];

    const validSortFields: (keyof Prisma.GymOrderByWithRelationInput)[] = [
        "gymName",
        "createdAt",
        "updatedAt",
        "city",
        "state",
        "gymType",
        "rating",
        "genderSegregation",
    ];

    const safeOrderBy =
        sort
            .filter(
                (s) =>
                    validSortFields.includes(s.field as any) &&
                    (s.order === "asc" || s.order === "desc")
            )
            .map((s) => ({ [s.field]: s.order })) || [];

    if (safeOrderBy.length === 0) safeOrderBy.push({ createdAt: "desc" });

    const hasValidSearch = Boolean(search?.searchText?.trim());
    const isSearchParamValid =
        validColumns.includes(search?.searchBy as keyof Prisma.GymOrderByWithRelationInput) &&
        hasValidSearch;

    const where: Prisma.GymWhereInput = {
        ...(isSearchParamValid && search
            ? {
                [search.searchBy]: {
                    contains: search.searchText,
                    mode: "insensitive",
                },
            }
            : {}),
        ...(filters.city && { city: { equals: filters.city, mode: "insensitive" } }),
        ...(filters.state && { state: { equals: filters.state, mode: "insensitive" } }),
        ...(filters.gymType && { gymType: { equals: filters.gymType } }),
        ...(filters.genderSegregation && { genderSegregation: { equals: filters.genderSegregation } }),
        ...(filters.amenities && { amenities: { hasSome: filters.amenities } }),
        ...(filters?.minRating !== undefined || filters?.maxRating !== undefined
            ? {
                rating: {
                    ...(filters.minRating !== undefined && { gte: filters.minRating }),
                    ...(filters.maxRating !== undefined && { lte: filters.maxRating }),
                },
            }
            : {}),



    }
        ;

    const totalGyms = await prisma.gym.count({ where });

    const gyms = await prisma.gym.findMany({
        skip: (safePage - 1) * safePageSize,
        take: safePageSize,
        orderBy: safeOrderBy,
        where,
    });

    const parsedGyms = gyms.map((g) => ({ ...g, rating: g.rating ? Number(g.rating) : null, }))

    const totalPages = Math.ceil(totalGyms / safePageSize);

    return {
        data: parsedGyms,
        page: safePage,
        pageSize: safePageSize,
        totalPages,
        totalElements: totalGyms,
    };
};


type SortDirections = "asc" | "desc" | null;
type ReviewSortParams = {
    field: "rating"
    | "createdAt"
    | "rating"
    | "votes";
    order: SortDirections;
}


type ReviewSearch = {
    searchText: string;
}

export const getAllReviews = async (
    gymId: number,
    page: number,
    pageSize: number,
    search: ReviewSearch,
    sort: ReviewSortParams[],
    filters: ReviewFilters,
): Promise<Page<Review>> => {
    //gymId check
    if (!gymId) throw new Error("No gymId passed");


    //page validation
    const MAX_PAGE_SIZE = 50;
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);

    //search Validation
    const isValidSearch = Boolean(search?.searchText?.trim());



    //filter validation
    const min = filters.minRating ?? 0;
    const max = filters.maxRating ?? 5;
    if (min < 0 || min > 5) throw new Error("Invalid min rating");
    if (max < 0 || max > 5) throw new Error("Invalid max rating");
    if (min > max) throw new Error("Min rating cannot exceed max rating");

    const start = filters.createdBefore ? new Date(filters.createdBefore) : null;
    const end = filters.createdAfter ? new Date(filters.createdAfter) : null;


    if (start && isNaN(start.getTime())) throw new Error("Invalid start date format");
    if (end && isNaN(end.getTime())) throw new Error("Invalid end date format");
    if (start && end && start > end) throw new Error("Start date cannot be later than end date");


    //where clause construction
    const where: Prisma.ReviewWhereInput = {
        AND: [
            ...(gymId ? [{ gymId }] : []),
            ...(filters?.minRating !== undefined && filters?.maxRating !== undefined
                ? [{
                    rating: {
                        ...(filters.minRating !== undefined && { gte: filters.minRating }),
                        ...(filters.maxRating !== undefined && { lte: filters.maxRating }),
                    },
                }]
                : []),
            ...(filters.createdAfter !== undefined && filters?.maxRating !== undefined ? [
                {
                    createdAt: {
                        ...(filters.createdBefore !== undefined && { gte: filters.createdBefore }),
                        ...(filters.createdAfter !== undefined && { lte: filters.createdAfter })
                    }
                }
            ] : [])
        ],
        ...(isValidSearch ? {
            OR: [
                { title: { contains: search.searchText.trim(), mode: "insensitive" } },
                { body: { contains: search.searchText.trim(), mode: "insensitive" } },
            ]
        } : {}),

    }





    //sort validation
    const safeOrderBy = sort.map((s) => {
        if (s.field === "votes") {
            return {
                votes: {
                    _count: s.order ?? undefined
                }
            };
        }
        return { [s.field]: s.order };
    }) || [];

    if (safeOrderBy.length === 0) safeOrderBy.push({ createdAt: "desc" });


    //total reviews calc
    const totalReviews = await prisma.review.count({ where });


    //db call
    const reviews = await prisma.review.findMany(
        {
            skip: (safePage - 1) * safePageSize,
            take: safePageSize,
            orderBy: safeOrderBy,
            where,

        }

    )
    const totalPages = Math.ceil(totalReviews / safePageSize);

    return {
        data: reviews,
        page: safePage,
        pageSize: safePageSize,
        totalPages,
        totalElements: totalReviews,
    };







}
