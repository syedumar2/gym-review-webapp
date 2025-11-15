import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ReviewFilters } from "../../../services/publicService";
import { useState } from "react";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Input } from "../ui/input";

type ReviewFilterMenuProps = {
  filters: ReviewFilters;
  onFilterChange: (filter: ReviewFilters) => void;
};

const ReviewFilterMenu = ({ filters, onFilterChange }: ReviewFilterMenuProps) => {
  const [currentFilters, setCurrentFilters] = useState<ReviewFilters>(filters);

  const updateFilter = (key: keyof ReviewFilters, value: any) => {
    setCurrentFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => onFilterChange(currentFilters);
  const resetFilters = () => {
    setCurrentFilters({});
    onFilterChange({});
  };

  return (
    <Sheet>
      <SheetTrigger>
        <div className="pill-button ml-2 bg-secondary text-white flex items-center gap-2 px-3 py-1 rounded-full">
          <ListFilter size={14} /> Filter
        </div>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col h-full bg-primary text-black py-4 px-5"
      >
        {/* Header */}
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-black">
            Filters
          </SheetTitle>
        </SheetHeader>

        <Separator className="bg-black my-3" />

        {/* Main filter body */}
        <div className="flex-1 overflow-y-auto space-y-8 pb-4">

          {/* ---- Rating Filter ---- */}
          <section>
            <Label className="text-sm mb-2 block">Minimum Rating</Label>

            <Slider
              min={0}
              max={5}
              step={1}
              value={[currentFilters.minRating ?? 0]}
              onValueChange={([value]) => updateFilter("minRating", value)}
            />

            <p className="text-xs text-black mt-2">
              {currentFilters.minRating ?? 0} Stars & above
            </p>
          </section>

          {/* ---- Date Filter ---- */}
          <section>
            <Label className="text-sm mb-2 block">Date Added</Label>

            <div className="flex gap-4">
              <div className="w-1/2">
                <Label className="text-xs block mb-1">From</Label>
                <Input
                  type="date"
                  value={currentFilters.createdBefore || ""}
                  onChange={(e) => updateFilter("createdBefore", e.target.value)}
                />
              </div>

              <div className="w-1/2">
                <Label className="text-xs block mb-1">To</Label>
                <Input
                  type="date"
                  value={currentFilters.createdAfter || ""}
                  onChange={(e) => updateFilter("createdAfter", e.target.value)}
                />
              </div>
            </div>
          </section>

        </div>


        {/* Bottom Sticky Buttons */}
        <div className="flex flex-col gap-2">
          <Button variant="ghost" onClick={resetFilters} className="w-full">
            Reset
          </Button>

          <Button variant="secondary" onClick={applyFilters} className="w-full">
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewFilterMenu;
