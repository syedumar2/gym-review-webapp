import { Gym, Prisma } from "@/generated/prisma/client";
import { Page, SearchParam, SortParam } from "@/types/api";
import prisma from "../lib/prisma";

export type SafeParsedGym = Omit<Gym, "rating"> & {
  rating: number | null;
};

export const getGymById = async (id: number): Promise<Gym> => {
    const gym = await prisma.gym.findFirst({ where: { id } });
    if (!gym) throw new Error(`No gym with id: ${id} found!`);
    return gym;

}

export const getAllGyms = async (
    page: number,
    pageSize: number,
    search: SearchParam | undefined,
    sort: SortParam[]
): Promise<Page<SafeParsedGym>> => {
    const MAX_PAGE_SIZE = 50;
    const safePage = Math.max(1, page);
    const safePageSize = Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE);

    const validColumns: (keyof Prisma.GymOrderByWithRelationInput)[] = [
        "gymName",
        "city",
        "state",
        "gymType",
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

    const where = isSearchParamValid && search
        ? {
            [search.searchBy]: {
                contains: search.searchText,
                mode: "insensitive",
            },
        }
        : undefined;

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
