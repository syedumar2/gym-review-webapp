import { Star, StarHalf } from "lucide-react";

type Props = {
  rating: number; 
};

const StarRating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex gap-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} fill="#ffc300" size={18} strokeWidth={0} color="black"/>
      ))}
      {hasHalf && <StarHalf fill="#ffc300" size={18} strokeWidth={0} />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} fill="#111" size={18} strokeWidth={0} />
      ))}
    </div>
  );
};

export default StarRating;
