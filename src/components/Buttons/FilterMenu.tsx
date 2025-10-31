import { ListFilter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

const FilterMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="pill-button ml-2 bg-secondary  ">
          <div className="bg-secondary flex gap-2 items-center text-white hover:cursor-pointer ">
            <ListFilter size={14} /> Filter
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default FilterMenu;
