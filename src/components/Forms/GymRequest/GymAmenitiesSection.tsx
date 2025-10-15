import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Amenity } from "@/generated/prisma/client";
import { AMENITY_LABELS } from "@/types/gym";
import { Controller } from "react-hook-form";
type Props = {
  control: any;
  errors: any;
};
const GymAmenitiesSection = ({ control, errors }: Props) => {
  const renderAmenitiesCheckBoxes = (
    enumObj: Record<string, string>,
    labelMap: Record<string, string>
  ) =>
    Object.keys(enumObj).map((key) => (
      <Controller
        key={key}
        name="amenities"
        control={control}
        render={({ field }) => {
          const checked = field.value?.includes(key);
          return (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                checked={checked}
                onCheckedChange={(isChecked) => {
                  const newValue = isChecked
                    ? [...(field.value || []), key]
                    : field.value?.filter((v: string) => v !== key);
                  field.onChange(newValue);
                }}
              />
              <Label htmlFor={`amenity-${key}`}>
                {labelMap[key] ?? key.replace(/_/g, " ")}
              </Label>
            </div>
          );
        }}
      />
    ));
  return (
    <div>
      <Label className="mb-2">Amenities</Label>
      <div className="grid grid-cols-2 gap-2">
        {renderAmenitiesCheckBoxes(Amenity, AMENITY_LABELS)}
      </div>
      {errors.amenities && (
        <p className="text-red-500 text-sm">{errors.amenities.message}</p>
      )}
    </div>
  );
};

export default GymAmenitiesSection;
