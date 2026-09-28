import { Link } from 'react-router-dom';
import { CalendarDays, Phone } from 'lucide-react';
import { images, restaurant } from '@shared/content.js';
import Reveal from './Reveal.jsx';

export default function ReservationCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-24 text-center sm:py-32">
      <img src={images.wine} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(14,12,10,0.8)_75%)]" />
      <Reveal className="container-x">
        <p className="eyebrow text-gold">Réservation</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-3xl leading-tight font-semibold text-cream sm:text-5xl">
          Réservez votre table dès maintenant&nbsp;!
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/75">
          Vivez une expérience gastronomique unique au Bistro Latin. Déjeuner, dîner ou soirée lounge : nous vous attendons.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/reservation" className="btn-gold px-9 py-4">
            Réserver une table <CalendarDays className="h-4 w-4" />
          </Link>
          <a href={restaurant.phoneHref} className="btn-outline px-8 py-4">
            <Phone className="h-4 w-4" /> {restaurant.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
