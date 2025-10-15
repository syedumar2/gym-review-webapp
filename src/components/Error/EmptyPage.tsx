import { LucideIcon, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const EmptyPage = ({
  heading,
  subHeading,
  Icon = Trash,
}: {
  heading: string;
  subHeading: string;
  Icon?: LucideIcon;
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-primary text-inverted">
      <Icon size={64} className="text-black mb-4" />
      <h2 className="section-heading  text-black">{heading}</h2>
      <h2 className="section-text text-lg text-gray !pt-0">{subHeading}</h2>
    </div>
  );
};
