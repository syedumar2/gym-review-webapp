import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  control: any;
};

const GymTimingsSections = ({ control }: Props) => {
  return (
    <div className="space-y-4">
      {/* Morning Timings */}
      <div>
        <Label>Morning Timings</Label>
        <div className="flex gap-4 mt-2">
          <div className="w-1/2">
            <Label className="text-sm">From</Label>
            <Controller
              name="morningStart"
              control={control}
              render={({ field }) => <Input type="time" {...field} />}
            />
          </div>
          <div className="w-1/2">
            <Label className="text-sm">To</Label>
            <Controller
              name="morningEnd"
              control={control}
              render={({ field }) => <Input type="time" {...field} />}
            />
          </div>
        </div>
      </div>

      {/* Evening Timings */}
      <div>
        <Label>Evening Timings</Label>
        <div className="flex gap-4 mt-2">
          <div className="w-1/2">
            <Label className="text-sm">From</Label>
            <Controller
              name="eveningStart"
              control={control}
              render={({ field }) => <Input type="time" {...field} />}
            />
          </div>
          <div className="w-1/2">
            <Label className="text-sm">To</Label>
            <Controller
              name="eveningEnd"
              control={control}
              render={({ field }) => <Input type="time" {...field} />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymTimingsSections;
