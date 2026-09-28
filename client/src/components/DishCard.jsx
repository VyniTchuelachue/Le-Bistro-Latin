import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@shared/content.js';

export default function DishCard({ dish }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_-30px_rgba(14,12,10,0.45)] ring-1 ring-sand/70 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(14,12,10,0.6)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg font-semibold text-ink">{dish.name}</h3>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{dish.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-bold tracking-wide text-ink">{formatPrice(dish.price)}</span>
          <Link
            to="/menu"
            aria-label={`Voir ${dish.name} dans le menu`}
            className="grid h-8 w-8 place-items-center rounded-full bg-gold text-ink transition group-hover:translate-x-0.5 hover:bg-gold-dark hover:text-cream"
          >
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
