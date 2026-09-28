import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Flame, Leaf, Search, Sparkles, X } from 'lucide-react';
import { formatPrice, images, menuCategories, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';

const tagMeta = {
  signature: { label: 'Signature', Icon: Sparkles, cls: 'bg-gold/15 text-gold-dark' },
  vegetarien: { label: 'Végétarien', Icon: Leaf, cls: 'bg-emerald-50 text-emerald-700' },
  epice: { label: 'Épicé', Icon: Flame, cls: 'bg-red-50 text-red-600' },
};

const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export default function Menu() {
  useDocumentTitle('Notre Menu');
  const [active, setActive] = useState(menuCategories[0].id);
  const [query, setQuery] = useState('');
  const [veggie, setVeggie] = useState(false);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    return menuCategories
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (it) =>
            (!veggie || it.tags?.includes('vegetarien')) &&
            (!q || normalize(`${it.name} ${it.description}`).includes(q)),
        ),
      }))
      .filter((c) => c.items.length);
  }, [query, veggie]);

  // Highlight the category currently in view.
  useEffect(() => {
    const sections = filtered.map((c) => document.getElementById(c.id)).filter(Boolean);
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const first = sections.find((s) => visible.has(s.id));
        if (first) setActive(first.id);
      },
      { rootMargin: '-160px 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [filtered]);

  useEffect(() => {
    document.getElementById(`tab-${active}`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [active]);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 150, behavior: 'smooth' });
  };

  return (
    <>
      <PageHero
        eyebrow="Notre menu"
        title="Une cuisine d’exception"
        subtitle="Influences françaises, italiennes, espagnoles et japonaises : une carte gourmande pour le déjeuner comme pour le dîner."
        image={images.heroPlate}
        crumb="Notre Menu"
      />

      {/* Sticky category bar */}
      <div className="sticky top-[68px] z-30 border-b border-sand bg-cream/95 backdrop-blur-md">
        <div className="container-x flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <nav className="no-scrollbar -mx-5 flex min-w-0 flex-1 gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0" aria-label="Catégories du menu">
            {filtered.map((c) => (
              <button
                key={c.id}
                id={`tab-${c.id}`}
                type="button"
                onClick={() => jump(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold tracking-wide whitespace-nowrap transition ${
                  active === c.id ? 'bg-ink text-cream' : 'text-ink/70 hover:bg-cream-2 hover:text-ink'
                }`}
              >
                {c.name}
              </button>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <label className="relative flex-1 lg:w-52 lg:flex-none">
              <span className="sr-only">Rechercher un plat</span>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un plat…"
                className="field rounded-full! py-2! pl-10"
              />
            </label>
            <button
              type="button"
              onClick={() => setVeggie((v) => !v)}
              aria-pressed={veggie}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                veggie ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-sand text-ink/70 hover:border-emerald-600'
              }`}
            >
              <Leaf className="h-3.5 w-3.5" /> Végétarien
            </button>
          </div>
        </div>
      </div>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x">
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-serif text-2xl">Aucun plat ne correspond à votre recherche.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setVeggie(false);
                }}
                className="btn-dark mt-6"
              >
                <X className="h-4 w-4" /> Réinitialiser
              </button>
            </div>
          )}

          <div className="space-y-20">
            {filtered.map((cat, ci) => (
              <section key={cat.id} id={cat.id} className="scroll-mt-40">
                <div className={`grid items-start gap-10 ${ci % 2 ? 'lg:grid-cols-[1fr_340px]' : 'lg:grid-cols-[340px_1fr]'}`}>
                  <Reveal className={`relative overflow-hidden rounded-sm lg:sticky lg:top-44 ${ci % 2 ? 'lg:order-2' : ''}`}>
                    <img src={cat.image} alt={cat.name} loading="lazy" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                      <p className="eyebrow text-gold">{cat.subtitle}</p>
                      <h2 className="mt-1 font-serif text-3xl font-semibold">{cat.name}</h2>
                    </div>
                  </Reveal>

                  <ul className="divide-y divide-sand">
                    {cat.items.map((item, i) => (
                      <Reveal as="li" key={item.name} delay={Math.min(i * 50, 250)} className="group py-5 first:pt-0">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-lg font-semibold text-ink transition group-hover:text-gold-dark">{item.name}</h3>
                          <span className="mb-1 flex-1 border-b border-dotted border-ink/25" aria-hidden="true" />
                          <span className="text-sm font-bold whitespace-nowrap text-ink">{formatPrice(item.price)}</span>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                          <p className="text-sm text-muted">{item.description}</p>
                          {item.tags?.map((t) => {
                            const meta = tagMeta[t];
                            if (!meta) return null;
                            return (
                              <span key={t} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${meta.cls}`}>
                                <meta.Icon className="h-3 w-3" /> {meta.label}
                              </span>
                            );
                          })}
                        </div>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <Reveal className="mt-20 flex flex-col items-center justify-between gap-6 rounded-sm bg-ink p-8 text-cream sm:p-10 md:flex-row">
            <div>
              <h2 className="font-serif text-2xl font-semibold">Une envie particulière ?</h2>
              <p className="mt-2 max-w-xl text-sm text-cream/70">
                Prix indicatifs en FCFA, susceptibles d’évoluer selon le marché. Demandez notre carte du jour et la carte des vins par WhatsApp.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a href={`https://wa.me/${restaurant.whatsappNumber}?text=${encodeURIComponent('Bonjour, pourriez-vous m’envoyer la carte du jour ?')}`} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1ebe5b]">
                <WhatsAppIcon className="h-4 w-4" /> Carte du jour
              </a>
              <Link to="/reservation" className="btn-gold">
                Réserver <CalendarDays className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
