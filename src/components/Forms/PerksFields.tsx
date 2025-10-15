import { useFieldArray, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";

type Props = {
  index: number;
  control: any;
};

export function PerksFieldArray({ index, control }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `membershipPlans.${index}.perks`,
  });

  return (
    <div className="space-y-4 rounded-lg border p-4 bg-muted/30">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Membership Perks</Label>
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="gap-1"
          onClick={() => append("")}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {fields.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            No perks added yet. These perks will be displayed in your membership plan.
          </p>
        )}

        {fields.map((perk, pIndex) => (
          <div key={perk.id} className="flex items-center gap-2">
            <Controller
              name={`membershipPlans.${index}.perks.${pIndex}`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={`Perk ${pIndex + 1}`}
                  className="flex-1"
                />
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(pIndex)}
              className="shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
