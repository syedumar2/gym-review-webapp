import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { INDIAN_CITIES } from "@/types/gym";
import { CommandGroup } from "cmdk";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { GymFilters } from "../../../../../services/publicService";

const CityInput = ({
  currentFilters,
  setCurrentFilters,
}: {
  currentFilters: GymFilters;
  setCurrentFilters: Dispatch<SetStateAction<GymFilters>>;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");

  function handleCitySelect(value: string): void {
    const isToggled = currentFilters.city === value;
    if (isToggled) {
      setCurrentFilters((prev) => ({ ...prev, city: undefined }));
      setSelectedCity("");
    } else {
      setCurrentFilters((prev) => ({ ...prev, city: value }));
      setSelectedCity(value);
    }
    setOpen(false); // close popover after selection
  }

  return (
    <>
      <Label className="text-black text-sm block">City</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="default" className="w-full h-7.5 justify-between">
            {selectedCity && selectedCity.length > 0
              ? selectedCity
              : "Select City"}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search city..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {INDIAN_CITIES.map((city, idx) => (
                  <CommandItem
                    key={idx}
                    value={city}
                    onSelect={() => handleCitySelect(city)}
                  >
                    {city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default CityInput;
