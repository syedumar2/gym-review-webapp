import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GymType, GenderSegregation } from "@/generated/prisma";
import { GYM_TYPE_LABELS, GENDER_SEGREGATION_LABELS } from "@/types/gym";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  control: any;
  errors: any;
  loading: boolean;
};

const GymBasicInfoSection = ({ control, errors, loading }: Props) => {
  const renderEnumOptions = (
    enumObj: Record<string, string>,
    labelMap: Record<string, string>
  ) =>
    Object.keys(enumObj).map((key) => (
      <SelectItem key={key} value={enumObj[key]}>
        {labelMap[key] ?? key.replace(/_/g, " ")}
      </SelectItem>
    ));

  return (
    <>
      {/* Gym Name */}
      <div>
        <Label htmlFor="name" className="mb-2">
          Gym Name
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input id="name" disabled={loading} {...field} />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Gym Type + Gender Segregation */}
      <div className="flex w-full gap-4">
        {/* Gym Type */}
        <div className="w-1/2">
          <Label htmlFor="type" className="mb-2 block">
            Gym Type
          </Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
                <SelectTrigger className="w-full" disabled={loading}>
                  <SelectValue placeholder="Select Gym Type" />
                </SelectTrigger>
                <SelectContent className="bg-primary">
                  {renderEnumOptions(GymType, GYM_TYPE_LABELS)}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* Gender Segregation */}
        <div className="w-1/2">
          <Label htmlFor="genderSegregation" className="mb-2 block">
            Gender Segregation
          </Label>
          <Controller
            name="genderSegregation"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={loading}
              >
                <SelectTrigger className="w-full" disabled={loading}>
                  <SelectValue placeholder="Select Gender Segregation" />
                </SelectTrigger>
                <SelectContent className="bg-primary">
                  {renderEnumOptions(
                    GenderSegregation,
                    GENDER_SEGREGATION_LABELS
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.genderSegregation && (
            <p className="text-red-500 text-sm">
              {errors.genderSegregation.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="mb-2">
          Description
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea id="description" disabled={loading} {...field} />
          )}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
    </>
  );
};

export default GymBasicInfoSection;
