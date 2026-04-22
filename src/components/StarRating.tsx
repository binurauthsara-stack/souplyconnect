import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: number;
  onChange: (v: number) => void;
  label: string;
}

export const StarRating = ({ value, onChange, label }: Props) => (
  <div className="flex items-center justify-between gap-3 py-3 border-b border-border last:border-0">
    <span className="text-sm sm:text-base font-medium text-foreground">{label}</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${label} ${n} stars`}
          onClick={() => onChange(n)}
          className="p-1 -m-1 transition-smooth hover:scale-110 active:scale-95"
        >
          <Star
            className={cn(
              "h-7 w-7 sm:h-8 sm:w-8 transition-smooth",
              n <= value
                ? "fill-star text-star"
                : "fill-muted text-muted-foreground/40"
            )}
          />
        </button>
      ))}
    </div>
  </div>
);
