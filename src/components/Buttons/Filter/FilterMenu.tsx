import { ListFilter } from "lucide-react";
import { Separator } from "../../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";

import { GenderSegregation, GymType } from "@/generated/prisma";
import {
  GENDER_SEGREGATION_LABELS,
  GYM_TYPE_LABELS
} from "@/types/gym";
import { useState } from "react";
import { GymFilters } from "../../../../services/publicService";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Slider } from "../../ui/slider";
import AmenitiesInput from "./Inputs/AmenitiesInput";
import StateInput from "./Inputs/StateInput";

type FilterMenuProps = {
  filters: GymFilters;
  onFilterChange: (filter: GymFilters) => void;
};

const FilterMenu = ({ filters, onFilterChange }: FilterMenuProps) => {
  const [currentFilters, setCurrentFilters] = useState<GymFilters>(filters);

  const applyFilters = () => {
    onFilterChange(currentFilters);
  };

  function handleGymTypeCheckboxChange(key: string, checked: string | boolean) {
    setCurrentFilters((prev) => ({
      ...prev,
      gymType: checked ? (key as GymType) : undefined,
    }));
  }

  function handleGenderSegregationCheckboxChange(
    key: string,
    checked: string | boolean
  ) {
    setCurrentFilters((prev) => ({
      ...prev,
      genderSegregation: checked ? (key as GenderSegregation) : undefined,
    }));
  }

  return (
    <Sheet>
      <SheetTrigger>
        <div className="pill-button ml-2 bg-secondary">
          <div className="bg-secondary flex gap-2 items-center text-white hover:cursor-pointer">
            <ListFilter size={14} /> Filter
          </div>
        </div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="bg-primary text-black overflow-y-auto py-2 px-4"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold text-black flex items-center gap-2">
            Filters
          </SheetTitle>
        </SheetHeader>

        <Separator className="bg-black my-2" />

        <div className="ml-4 space-y-4">
          {/* --- State Filter --- */}
          <div className="flex items-center w-[85%] gap-4 justify-between">
            <StateInput
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
            />
          </div>

          {/* --- City Filter --- */}
          <div className="flex items-center gap-6">
            <Label className="text-black text-sm  block">City</Label>
            <Input
              placeholder="Enter city"
              className="bg-accent border-accent text-black h-7.5 w-full focus:ring-2 focus:ring-secondary placeholder:text-white"
              value={currentFilters?.city ?? ""}
              onChange={(e) =>
                setCurrentFilters((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
            />
          </div>

          {/* --- Gym Type Filter --- */}
          <div>
            <Label className="text-black text-sm mb-2 block">Gym Type</Label>
            <div className="space-y-2">
              {Object.entries(GYM_TYPE_LABELS).map(([key, type]) => (
                <div
                  key={key}
                  className="flex items-center justify-between space-x-2"
                >
                  <Label htmlFor={type} className="text-sm font-light">
                    {type}
                  </Label>
                  <Checkbox
                    id={type}
                    checked={currentFilters?.gymType === key}
                    onCheckedChange={(checked) =>
                      handleGymTypeCheckboxChange(key, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Gender Segregation --- */}
          <div>
            <Label className="text-black text-sm mb-2 block">
              Gender Segregation
            </Label>
            <div className="space-y-2">
              {Object.entries(GENDER_SEGREGATION_LABELS).map(
                ([key, option]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between space-x-2"
                  >
                    <Label htmlFor={option} className="text-sm font-light">
                      {option}
                    </Label>
                    <Checkbox
                      id={option}
                      checked={currentFilters?.genderSegregation === key}
                      onCheckedChange={(checked) =>
                        handleGenderSegregationCheckboxChange(key, checked)
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* --- Amenities --- */}
          <div>
            <AmenitiesInput
              currentFilters={currentFilters}
              setCurrentFilters={setCurrentFilters}
            />
          </div>

          {/* --- Rating Filter --- */}
          <div>
            <Label className="text-black text-sm mb-3 block">
              Minimum Rating
            </Label>
            <Slider
              className="bg-white border-blue my-2"
              defaultValue={[3]}
              value={currentFilters.minRating !== undefined ? [currentFilters.minRating] : undefined}
              min={0}
              max={5}
              step={1}
              onValueChange={([value]) =>
                setCurrentFilters((prev) => ({
                  ...prev,
                  minRating: value,
                }))
              }
            />
            <p className="text-xs text-black mt-3">
              {currentFilters.minRating ?? 3} Stars & above
            </p>
          </div>
        </div>

        <Separator className="my-4 bg-black" />

        {/* --- Action Buttons --- */}
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentFilters({});
              applyFilters();
            }} // reset to original
          >
            Reset
          </Button>
          <Button variant="secondary" onClick={() => applyFilters()}>
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMenu;
