import { Star } from "lucide-react";

export const HalfStar = ({ filled }: { filled: string }) => {
  return (
    <div className="relative w-12 h-12">
      {/* empty star */}
      <Star className="text-black/50  w-12 h-12" />

      {/* filled part */}
      <div
        className="absolute inset-0 overflow-hidden "
        style={{
          width: filled === "full" ? "100%" : filled === "half" ? "50%" : "0%",
        }}
      >
        <Star className="text-yellow-500 fill-yellow-500 w-12 h-12 " />
      </div>
    </div>
  );
};
