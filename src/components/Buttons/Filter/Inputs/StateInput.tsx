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
import { INDIAN_STATES } from "@/types/gym";
import { CommandGroup } from "cmdk";
import { Dispatch, SetStateAction, useState } from "react";
import { GymFilters } from "../../../../../services/publicService";
import { ChevronDown } from "lucide-react";

const StateInput = ({
  currentFilters,
  setCurrentFilters,
}: {
  currentFilters: GymFilters;
  setCurrentFilters: Dispatch<SetStateAction<GymFilters>>;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  function handleStateSelect(value: string): void {
    const isToggled = currentFilters.state === value;
    if (isToggled) {
      setCurrentFilters((prev) => ({ ...prev, state: undefined }));
      setSelectedState("");
    } else {
      setCurrentFilters((prev) => ({ ...prev, state: value }));
      setSelectedState(value);
    }
    setOpen(false); // optional: close popover after selection
  }

  return (
    <>
      <Label className="text-black text-sm  block">State</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="default" className="w-full h-7.5 justify-between bg-accent border-0">
            {selectedState && selectedState.length > 0
              ? selectedState
              : currentFilters.state
              ? currentFilters.state
              : "Select State"}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 " side="right" align="start">
          <Command>
            <CommandInput placeholder="Change State..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {INDIAN_STATES.map((state, idx) => (
                  <CommandItem
                    key={idx}
                    value={state}
                    onSelect={() => handleStateSelect(state)}
                  >
                    {state}
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

export default StateInput;
