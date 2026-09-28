import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { restaurant, testimonials } from '@shared/content.js';
import SectionHeading from './SectionHeading.jsx';
import Stars from './Stars.jsx';
import { TripadvisorIcon } from './BrandIcons.jsx';

const initials = (name) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const track = useRef(null);
  const [paused, setPaused] = useState(false);

  const scroll = useCallback((dir) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('article');
    const step = card ? card.offsetWidth + 24 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    if (dir > 0 && atEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
    else el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => scroll(1), 6000);
    return () => clearInterval(id);
  }, [paused, scroll]);

  const { tripadvisor, google } = restaurant.ratings;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Témoignages" title="Ce que disent nos clients" align="center" />

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Stars value={google.score} className="h-3.5 w-3.5" />
            <strong className="text-ink">{google.score.toString().replace('.', ',')}/5</strong> sur Google
          </span>
          <a href={restaurant.socials.tripadvisor} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-ink">
            <TripadvisorIcon className="h-5 w-5 text-[#00aa6c]" />
            <strong className="text-ink">{tripadvisor.score.toString().replace('.', ',')}/5</strong> · {tripadvisor.reviews} avis Tripadvisor
          </a>
        </div>

        <div className="relative mt-12" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Avis précédent"
            className="absolute top-1/2 -left-2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand bg-white text-ink shadow-md transition hover:border-gold hover:text-gold md:grid lg:-left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div ref={track} className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4">
            {testimonials.map((t) => (
              <article
                key={t.name}
                className="relative flex w-[85%] shrink-0 snap-start flex-col rounded-sm bg-white p-7 shadow-[0_20px_50px_-35px_rgba(14,12,10,0.5)] ring-1 ring-sand/70 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-gold/15" />
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-light to-gold-dark font-serif text-lg font-semibold text-ink">
                    {initials(t.name)}
                  </span>
                  <div>
                    <Stars value={t.rating} />
                    <p className="mt-1.5 text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
                <p className="mt-5 text-[0.95rem] leading-relaxed text-ink/80 italic">“{t.text}”</p>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Avis suivant"
            className="absolute top-1/2 -right-2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-sand bg-white text-ink shadow-md transition hover:border-gold hover:text-gold md:grid lg:-right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
