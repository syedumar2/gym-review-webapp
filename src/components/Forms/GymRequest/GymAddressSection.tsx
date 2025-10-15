import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { Controller } from "react-hook-form";

type Props = {
  errors: any;
  control: any;
};

const GymAddressSection = ({ errors, control }: Props) => {
  return (
    <>
      {/* Address */}
      <div>
        <Label htmlFor="address" className="mb-2">
          Address
        </Label>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input id="address" {...field} />
          )}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      {/* City + State */}
      <div className="flex w-full gap-4 justify-between">
        <div className="w-full">
          <Label htmlFor="city" className="mb-2">
            City
          </Label>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input id="city" {...field} />
            )}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="state" className="mb-2">
            State
          </Label>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input id="state" {...field} />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="mb-2">
          Phone no:
        </Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput id="phone" value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm">{errors.phone.message}</p>
        )}
      </div>
    </>
  );
};

export default GymAddressSection;
