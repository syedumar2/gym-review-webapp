"use client";
import { SortParam } from "@/types/api";
import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type SortMenuProps = {
  fields: string[];
  labels: Record<string, string>;
  activeSorts: SortParam[];
  onSortChange: (field: string, direction: "asc" | "desc" | null) => void;
};

const SortMenu = ({
  fields,
  labels,
  activeSorts,
  onSortChange,
}: SortMenuProps) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleClick = (sort: SortParam) => {
    let nextDirection: "asc" | "desc" | null = null;
    if (sort.order === null) nextDirection = "asc";
    else if (sort.order === "asc") nextDirection = "desc";
    else nextDirection = null;
    onSortChange(sort.field, nextDirection);
  };

  const renderButtons = (fields: string[], labels: Record<string, string>) => {
    return fields.map((f) => {
      const isToggled = activeSorts.find((param) => param.field === f);
      return (
        <Button
          key={f}
          variant="default"
          size={"sm"}
          className="rounded-full bg-accent"
          onClick={() =>
            handleClick({ field: f, order: isToggled?.order ?? null })
          }
        >
          {labels[f]}
          {isToggled ? (
            isToggled.order === "asc" ? (
              <ChevronDown />
            ) : (
              <ChevronUp />
            )
          ) : null}
        </Button>
      );
    });
  };

  return (
    <div className="pill-button bg-secondary  ">
      <div className={!showSortMenu ? "hidden" : "flex gap-2 items-center "}>
        {renderButtons(fields, labels)}
      </div>
      <div
        className="bg-secondary text-white hover:cursor-pointer "
        onClick={() => setShowSortMenu((prev) => !prev)}
      >
        Sort
      </div>
    </div>
  );
};

export default SortMenu;
