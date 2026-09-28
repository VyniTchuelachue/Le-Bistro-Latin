import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, ChefHat, ConciergeBell, Gem, UtensilsCrossed } from 'lucide-react';
import { images, menuCategories, restaurant, specialties } from '@shared/content.js';
import InfoBar from '../components/InfoBar.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import DishCard from '../components/DishCard.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ReservationCTA from '../components/ReservationCTA.jsx';
import Reveal from '../components/Reveal.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const highlights = [
  { Icon: UtensilsCrossed, label: 'Cuisine française & latine' },
  { Icon: ChefHat, label: 'Chef expérimenté' },
  { Icon: Gem, label: 'Cadre élégant' },
  { Icon: ConciergeBell, label: 'Service haut de gamme' },
];

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pt-28 pb-16">
      <img
        src={images.hero}
        alt="Viande grillée et verre de vin au Bistro Latin"
        className="absolute inset-0 -z-20 h-full w-full animate-slow-zoom object-cover object-[70%_center]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-2 to-transparent" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="eyebrow flex animate-fade-up items-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold" /> Bienvenue au
          </p>
          <h1 className="mt-5 animate-fade-up font-serif text-5xl leading-[1.02] font-semibold text-cream [animation-delay:100ms] sm:text-7xl lg:text-[5.5rem]">
            Le Bistro Latin
          </h1>
          <p className="mt-5 animate-fade-up font-serif text-2xl leading-snug text-cream/95 [animation-delay:200ms] sm:text-3xl">
            Une expérience culinaire raffinée
            <br className="hidden sm:block" /> au cœur de Douala
          </p>
          <p className="mt-6 max-w-lg animate-fade-up text-[0.95rem] leading-relaxed text-cream/75 [animation-delay:300ms]">
            Savourez une cuisine gourmande aux influences françaises, italiennes, espagnoles et japonaises, dans une grande salle
            ouverte sur une cour intérieure arborée. Le Bistro Latin, l’adresse incontournable de Bonapriso.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-4 [animation-delay:400ms] sm:flex-row">
            <Link to="/menu" className="btn-gold">
              Découvrir notre menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/reservation" className="btn-outline">
              Réserver une table <CalendarDays className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <ul className="hidden animate-fade-up space-y-8 border-l border-white/10 pl-10 [animation-delay:500ms] lg:block">
          {highlights.map(({ Icon, label }) => (
            <li key={label} className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-ink/40 text-gold backdrop-blur-sm">
                <Icon className="h-6 w-6" strokeWidth={1.4} />
              </span>
              <span className="max-w-[9rem] text-xs leading-snug font-semibold tracking-[0.14em] text-cream uppercase">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Specialties() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Nos spécialités" title="Des plats qui éveillent les sens" />
          <Reveal>
            <Link to="/menu" className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-gold-dark uppercase">
              Voir tout le menu <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((dish, i) => (
            <Reveal key={dish.name} delay={i * 90}>
              <DishCard dish={dish} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  const stats = [
    { value: `${restaurant.ratings.google.score.toString().replace('.', ',')}/5`, label: 'Note Google' },
    { value: restaurant.ratings.tripadvisor.reviews, label: 'Avis Tripadvisor' },
    { value: '6j/7', label: 'Midi & soir' },
  ];
  return (
    <section className="relative overflow-hidden bg-ink text-cream">
      <div className="grid lg:grid-cols-2">
        <div className="container-x flex items-center py-20 sm:py-28 lg:mr-0 lg:max-w-[640px] lg:pr-16">
          <div>
            <SectionHeading eyebrow="À propos de nous" dark title={<>L’élégance d’un lieu,<br />la richesse des saveurs</>}>
              <p>
                Derrière une façade discrète de la rue Batibois se cache l’une des plus belles tables de Douala : une grande salle
                chaleureuse qui s’ouvre sur une cour intérieure arborée. Ici, les traditions françaises rencontrent les saveurs d’Italie,
                d’Espagne, d’Amérique latine et du Japon.
              </p>
              <p className="mt-4">Idéal pour vos dîners, repas d’affaires et célébrations — et le soir, l’ambiance se fait lounge.</p>
            </SectionHeading>
            <Reveal className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line border-y border-line">
              {stats.map((s) => (
                <div key={s.label} className="px-3 py-5 text-center first:pl-0">
                  <p className="font-serif text-2xl font-semibold text-gold sm:text-3xl">{s.value}</p>
                  <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-cream/60 uppercase">{s.label}</p>
                </div>
              ))}
            </Reveal>
            <Reveal className="mt-10">
              <Link to="/restaurant" className="btn-gold">
                En savoir plus <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
        <div className="relative min-h-[360px] lg:min-h-full">
          <img src={images.interiorDark} alt="La salle du Bistro Latin" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/20 to-transparent lg:via-transparent" />
        </div>
      </div>
    </section>
  );
}

function MenuCategories() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Notre menu" title="Une cuisine d’exception" align="center">
          Des entrées raffinées aux desserts de notre pâtisserie, chaque assiette est pensée comme un voyage.
        </SectionHeading>
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {menuCategories.slice(0, 6).map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ambiance() {
  return (
    <section className="bg-ink text-cream">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="relative min-h-[360px]">
          <img src={images.courtyard} alt="Salle verdoyante et lumineuse" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-ink via-transparent to-transparent" />
        </div>
        <div className="container-x flex items-center py-20 sm:py-24 lg:ml-0 lg:max-w-[600px] lg:pl-16">
          <div>
            <SectionHeading eyebrow="Notre ambiance" dark title="Un cadre chic et chaleureux">
              Profitez d’un espace élégant et raffiné, idéal pour un dîner en tête-à-tête, une sortie entre amis ou un événement spécial.
            </SectionHeading>
            <Reveal as="ul" className="mt-8 grid gap-3 text-sm text-cream/80 sm:grid-cols-2">
              {restaurant.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-gold" /> {a}
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-10">
              <Link to="/galerie" className="btn-gold">
                Voir la galerie <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useDocumentTitle();
  return (
    <>
      <Hero />
      <InfoBar />
      <Specialties />
      <AboutTeaser />
      <MenuCategories />
      <Ambiance />
      <Testimonials />
      <ReservationCTA />
    </>
  );
}
