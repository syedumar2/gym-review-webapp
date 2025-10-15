import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  CardioEquipment,
  FunctionalEquipment,
  MiscEquipment,
  StrengthEquipment,
} from "@/generated/prisma";
import { GymFormInput } from "@/schemas/GymRequestSchema";
import {
  CARDIO_EQUIPMENT_LABELS,
  FUNCTIONAL_EQUIPMENT_LABELS,
  MISC_EQUIPMENT_LABELS,
  STRENGTH_EQUIPMENT_LABELS,
} from "@/types/gym";
import { Controller } from "react-hook-form";

type Props = {
  control: any;
  errors: any;
};
const GymEquipmentSection = ({ control, errors }: Props) => {
  const renderEquipmentCheckboxes = (
    fieldName: keyof GymFormInput,
    enumObj: Record<string, string>,
    labelMap: Record<string, string>
  ) =>
    Object.keys(enumObj).map((key) => (
      <Controller
        key={key}
        name={fieldName}
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
                    : field.value.filter((v: string) => v !== key);
                  field.onChange(newValue);
                }}
              />
              <Label htmlFor={`${fieldName}-${key}`}>
                {labelMap[key] ?? key.replace(/_/g, " ")}
              </Label>
            </div>
          );
        }}
      />
    ));
  return (
    <>
      {[
        {
          name: "Cardio Equipment",
          key: "cardioEquipment" as keyof GymFormInput,
          enumObj: CardioEquipment,
          labelMap: CARDIO_EQUIPMENT_LABELS,
        },
        {
          name: "Strength Equipment",
          key: "strengthEquipment" as keyof GymFormInput,
          enumObj: StrengthEquipment,
          labelMap: STRENGTH_EQUIPMENT_LABELS,
        },
        {
          name: "Functional Equipment",
          key: "functionalEquipment" as keyof GymFormInput,
          enumObj: FunctionalEquipment,
          labelMap: FUNCTIONAL_EQUIPMENT_LABELS,
        },
        {
          name: "Miscellaneous Equipment",
          key: "miscEquipment" as keyof GymFormInput,
          enumObj: MiscEquipment,
          labelMap: MISC_EQUIPMENT_LABELS,
        },
      ].map((section) => (
        <div key={section.key}>
          <Label className="mb-2">{section.name}</Label>
          <div className="grid grid-cols-2 gap-2">
            {renderEquipmentCheckboxes(
              section.key,
              section.enumObj,
              section.labelMap
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default GymEquipmentSection;
