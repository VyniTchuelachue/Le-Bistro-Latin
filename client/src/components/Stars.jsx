import { Star } from 'lucide-react';

export default function Stars({ value = 5, className = 'h-4 w-4' }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={className} fill={i < Math.round(value) ? 'currentColor' : 'none'} strokeWidth={1.5} />
      ))}
    </div>
  );
}
