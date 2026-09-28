import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gallery, galleryCategories, images, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import ReservationCTA from '../components/ReservationCTA.jsx';
import { InstagramIcon } from '../components/BrandIcons.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onMove]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}>
      <button type="button" aria-label="Fermer" className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-ink">
        <X className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Photo précédente"
        onClick={(e) => {
          e.stopPropagation();
          onMove(-1);
        }}
        className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-ink sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={item.src.replace(/w=\d+/, 'w=2000')} alt={item.alt} className="max-h-[80vh] w-auto rounded-sm object-contain" />
        <figcaption className="mt-4 text-center text-sm text-white/70">
          {item.alt} <span className="text-white/40">· {index + 1} / {items.length}</span>
        </figcaption>
      </figure>
      <button
        type="button"
        aria-label="Photo suivante"
        onClick={(e) => {
          e.stopPropagation();
          onMove(1);
        }}
        className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-gold hover:text-ink sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

export default function Gallery() {
  useDocumentTitle('Galerie');
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(null);

  const items = useMemo(() => (filter === 'all' ? gallery : gallery.filter((g) => g.category === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((dir) => setOpen((i) => (i + dir + items.length) % items.length), [items.length]);

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Un avant-goût du Bistro"
        subtitle="Nos assiettes, notre salle, notre bar lounge et nos plus beaux moments partagés."
        image={images.lounge}
        crumb="Galerie"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x">
          <div className="no-scrollbar -mx-5 flex justify-start gap-2 overflow-x-auto px-5 sm:mx-0 sm:justify-center sm:px-0">
            {galleryCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-xs font-semibold tracking-wide transition ${
                  filter === c.id ? 'border-ink bg-ink text-cream' : 'border-sand text-ink/70 hover:border-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {items.map((item, i) => (
              <Reveal key={item.src} delay={(i % 3) * 80} className="mb-5 break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group relative block w-full overflow-hidden rounded-sm bg-ink"
                  aria-label={`Agrandir : ${item.alt}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={`w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80 ${item.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}
                  />
                  <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-5 text-left text-cream opacity-0 transition duration-500 group-hover:opacity-100">
                    <span className="font-serif text-lg">{item.alt}</span>
                    <Expand className="h-5 w-5 text-gold" />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <a href={restaurant.socials.instagram} target="_blank" rel="noreferrer" className="btn-dark">
              <InstagramIcon className="h-4 w-4" /> Suivez-nous @bistro.latin_douala
            </a>
          </Reveal>
        </div>
      </section>

      {open !== null && <Lightbox items={items} index={open} onClose={close} onMove={move} />}
      <ReservationCTA />
    </>
  );
}
