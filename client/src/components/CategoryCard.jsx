import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/menu#${category.id}`}
      className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-sm bg-ink p-5 text-cream ring-1 ring-black/5"
    >
      <img
        src={category.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition duration-500 group-hover:from-black/95" />
      <div className="relative">
        <h3 className="font-serif text-lg font-semibold">{category.name}</h3>
        <p className="mt-0.5 text-xs text-cream/70">{category.subtitle}</p>
        <span className="mt-4 ml-auto grid h-8 w-8 place-items-center rounded-full border border-gold text-gold transition group-hover:bg-gold group-hover:text-ink">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
