import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone } from 'lucide-react';
import { restaurant } from '@shared/content.js';
import Logo from './Logo.jsx';
import { navLinks } from './Navbar.jsx';
import { FacebookIcon, InstagramIcon, TripadvisorIcon, WhatsAppIcon } from './BrandIcons.jsx';

const socials = [
  { href: restaurant.socials.facebook, label: 'Facebook', Icon: FacebookIcon },
  { href: restaurant.socials.instagram, label: 'Instagram', Icon: InstagramIcon },
  { href: `https://wa.me/${restaurant.whatsappNumber}`, label: 'WhatsApp', Icon: WhatsAppIcon },
  { href: restaurant.socials.tripadvisor, label: 'Tripadvisor', Icon: TripadvisorIcon },
];

export default function Footer() {
  const { address } = restaurant;
  return (
    <footer className="bg-ink text-cream/75">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.2fr] lg:gap-10">
        <div>
          <Logo size="lg" className="pt-6" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Cuisine raffinée aux influences françaises, italiennes, espagnoles et japonaises, au cœur de Bonapriso.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition hover:border-gold hover:bg-gold hover:text-ink"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream">Liens rapides</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/reservation" className="text-gold transition hover:text-gold-light">
                Réservation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream">Horaires d’ouverture</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>
                Lundi – Samedi
                <br />
                11h00 – 23h00
                <br />
                <span className="text-cream/50">{restaurant.closedSummary}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                {address.street}, {address.district}
                <br />
                {address.city}, {address.country}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-lg text-cream">Contact</h3>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={restaurant.phoneHref} className="transition hover:text-gold">
                {restaurant.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <a href={`https://wa.me/${restaurant.whatsappNumber}`} target="_blank" rel="noreferrer" className="transition hover:text-gold">
                {restaurant.whatsapp} <span className="text-cream/50">(WhatsApp)</span>
              </a>
            </li>
          </ul>
          <Link to="/reservation" className="btn-gold mt-7">
            Réserver une table
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Le Bistro Latin. Tous droits réservés.</p>
          <p className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Cuisine française</span>
            <span className="text-gold/60">|</span>
            <span>Saveurs latines</span>
            <span className="text-gold/60">|</span>
            <span>Bonapriso, Douala</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
