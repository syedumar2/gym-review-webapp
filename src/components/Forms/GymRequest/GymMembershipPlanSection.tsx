import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PerksFieldArray } from "../PerksFields";
import { Button } from "@/components/ui/button";
import { PlanType } from "@/schemas/GymRequestSchema";
import { Trash, Plus } from "lucide-react";
import { Controller, useFieldArray } from "react-hook-form";

type Props = {
  control: any;
  errors: any;
};

const GymMembershipPlanSection = ({ control, errors }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "membershipPlans",
  });

  return (
    <div className="w-full">
      <Label>Membership Plans</Label>
      {fields.map((plan, index) => (
        <div
          key={plan.id}
          className="p-4 space-y-2 my-2 border border-gray/50 rounded-xl"
        >
          {/* Plan Name */}
          <div className="w-full">
            <Label>Plan Name</Label>
            <Controller
              name={`membershipPlans.${index}.planName`}
              control={control}
              render={({ field }) => <Input {...field} className="mt-2" />}
            />
            {errors.membershipPlans?.[index]?.planName && (
              <p className="text-red-500">
                {errors.membershipPlans?.[index]?.planName?.message}
              </p>
            )}
          </div>

          {/* Plan Type + Price */}
          <div className="flex gap-4 items-center justify-between mt-2">
            <div className="w-full">
              <Label>Plan Type</Label>
              <Controller
                control={control}
                name={`membershipPlans.${index}.planType`}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select Plan Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-primary">
                      <SelectItem value={PlanType.DAILY}>Daily</SelectItem>
                      <SelectItem value={PlanType.WEEKLY}>Weekly</SelectItem>
                      <SelectItem value={PlanType.MONTHLY}>Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="w-full">
              <Label>Price</Label>
              <Controller
                name={`membershipPlans.${index}.price`}
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    {...field}
                    value={field.value ?? 0}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="mt-1"
                  />
                )}
              />
            </div>
          </div>

          {/* Perks */}
          <div className="space-y-2 mt-4">
            <Label>Perks</Label>
            <PerksFieldArray index={index} control={control} />
          </div>

          {/* Remove button */}
          <div className="flex w-full justify-end mt-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <Trash /> Remove Membership plan
            </Button>
          </div>
        </div>
      ))}

      {/* Add button */}
      <div className="flex w-full justify-end mt-4">
        <Button
          type="button"
          onClick={() =>
            append({
              planName: "",
              planType: PlanType.MONTHLY,
              price: 0,
              perks: [""],
            })
          }
        >
          <Plus />
          Add Plan
        </Button>
      </div>
    </div>
  );
};

export default GymMembershipPlanSection;
