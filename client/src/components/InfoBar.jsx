import { Clock, MapPin, Phone } from 'lucide-react';
import { restaurant } from '@shared/content.js';
import { openStatus } from '../lib/hours.js';
import { WhatsAppIcon } from './BrandIcons.jsx';

export default function InfoBar() {
  const status = openStatus();
  const items = [
    {
      Icon: MapPin,
      top: `${restaurant.address.street}, ${restaurant.address.district}`,
      bottom: `${restaurant.address.city}, ${restaurant.address.country}`,
      href: restaurant.mapsUrl,
      external: true,
    },
    {
      Icon: Clock,
      top: 'Lundi – Samedi',
      bottom: '11h00 – 23h00',
      badge: status,
    },
    {
      Icon: Phone,
      top: 'Réservations',
      bottom: restaurant.phone,
      href: restaurant.phoneHref,
    },
    {
      Icon: WhatsAppIcon,
      top: 'WhatsApp',
      bottom: restaurant.whatsapp,
      href: `https://wa.me/${restaurant.whatsappNumber}`,
      external: true,
    },
  ];

  return (
    <section className="relative z-10 border-y border-line bg-ink-2" aria-label="Informations pratiques">
      <div className="container-x grid grid-cols-1 divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {items.map(({ Icon, top, bottom, href, external, badge }) => {
          const inner = (
            <>
              <Icon className="h-7 w-7 shrink-0 text-gold" strokeWidth={1.4} />
              <div className="text-sm leading-snug">
                <p className="text-cream/60">{top}</p>
                <p className="font-medium text-cream">{bottom}</p>
                {badge && (
                  <p className={`mt-1 flex items-center gap-1.5 text-[0.7rem] font-semibold ${badge.open ? 'text-emerald-400' : 'text-cream/50'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${badge.open ? 'animate-pulse bg-emerald-400' : 'bg-cream/40'}`} />
                    {badge.label}
                  </p>
                )}
              </div>
            </>
          );
          const cls = 'flex items-center gap-4 py-6 sm:px-6 lg:justify-center';
          return href ? (
            <a key={top} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} className={`${cls} transition hover:bg-ink-3`}>
              {inner}
            </a>
          ) : (
            <div key={top} className={cls}>
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
