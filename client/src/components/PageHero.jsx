import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ eyebrow, title, subtitle, image, crumb }) {
  return (
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-ink pt-32 pb-16 sm:min-h-[480px]">
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full animate-slow-zoom object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      <div className="container-x">
        <nav aria-label="Fil d’Ariane" className="mb-5 flex items-center gap-1.5 text-xs text-cream/60">
          <Link to="/" className="hover:text-gold">
            Accueil
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold">{crumb || title}</span>
        </nav>
        <p className="eyebrow animate-fade-up text-gold">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl animate-fade-up font-serif text-4xl leading-[1.1] font-semibold text-cream [animation-delay:100ms] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-cream/75 [animation-delay:200ms]">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
