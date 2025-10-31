import { SortParam } from "@/types/api";
import { useState } from "react";

export const useSort = (initialSort: SortParam[]) => {
    const [sort, setSort] = useState<SortParam[]>(initialSort);

    const handleSortChange = (
        field: string,
        direction: "asc" | "desc" | null
    ) => {
        setSort((prev) => {
            const filtered = prev.filter((s) => s.field !== field);
            return direction ? [...filtered, { field, order: direction }] : filtered;
        });
    };

    return { sort, handleSortChange };
};
