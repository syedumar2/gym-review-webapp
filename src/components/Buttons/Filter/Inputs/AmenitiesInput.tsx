import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AMENITY_LABELS } from "@/types/gym";
import { CirclePlus, X, ChevronDown } from "lucide-react";
import { GymFilters } from "../../../../../services/publicService";
import { Amenity } from "@/generated/prisma/client";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

type AmenitiesInputProps = {
  currentFilters: GymFilters;
  setCurrentFilters: Dispatch<SetStateAction<GymFilters>>;
};

const AmenitiesInput = ({
  currentFilters,
  setCurrentFilters,
}: AmenitiesInputProps) => {
  const [amenityInput, setAmenityInput] = useState<string>("");
  const [open, setOpen] = useState(false);

  function handleAddAmenity(event: React.MouseEvent<SVGSVGElement>): void {
    event.preventDefault();
    const value = amenityInput.trim();
    if (!value) return;
    setCurrentFilters((prev) => {
      const isIncluded = prev.amenities?.includes(amenityInput as Amenity);

      return {
        ...prev,
        amenities: isIncluded
          ? prev.amenities?.filter((a) => a !== (amenityInput as Amenity)) ?? []
          : [...(prev.amenities ?? []), amenityInput as Amenity],
      };
    });
    setAmenityInput("");
  }

  function handleRemoveAmenity(index: number) {
    setCurrentFilters((prev) => ({
      ...prev,
      amenities: prev.amenities?.filter((_, i) => i !== index) ?? [],
    }));
  }

  function handleAmenitySelect(value: string): void {
    setAmenityInput(value);
    setCurrentFilters((prev) => {
      const isIncluded = prev.amenities?.includes(value as Amenity);
      return {
        ...prev,
        amenities: isIncluded
          ? prev.amenities?.filter((a) => a !== (value as Amenity)) ?? []
          : [...(prev.amenities ?? []), value as Amenity],
      };
    });
    setOpen(false);
  }

  return (
    <div>
      <Label className="text-black text-sm mb-2 block">Amenities</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="default"
            className="w-full h-9 justify-between bg-accent border border-accent text-black rounded-lg px-3"
          >
            {amenityInput && amenityInput.length > 0
              ? AMENITY_LABELS[amenityInput as keyof typeof AMENITY_LABELS]
              : "Add amenity..."}
            <ChevronDown />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-[250px]" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search amenities..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Object.entries(AMENITY_LABELS).map(([key, label]) => (
                  <CommandItem
                    key={key}
                    value={label}
                    onSelect={() => handleAmenitySelect(key)}
                  >
                    {label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="relative w-full mt-2">
        <CirclePlus
          className="absolute right-2 top-2 text-gray-500 hover:text-secondary cursor-pointer"
          size={18}
          onClick={handleAddAmenity}
        />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {currentFilters?.amenities?.map((f, idx) => (
          <span
            key={idx}
            className="flex items-center gap-2 bg-blue-600 text-white rounded-full px-4 py-1 text-sm"
          >
            {AMENITY_LABELS[f] ?? f}
            <X
              size={14}
              className="cursor-pointer hover:text-gray-200"
              onClick={() => handleRemoveAmenity(idx)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesInput;
