import { Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { images, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import ReservationForm from '../components/ReservationForm.jsx';
import Reveal from '../components/Reveal.jsx';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

export default function Reservation() {
  useDocumentTitle('Réserver une table');
  const info = [
    { Icon: Clock, title: 'Horaires', text: `${restaurant.hoursSummary}\n${restaurant.closedSummary}` },
    { Icon: MapPin, title: 'Adresse', text: `${restaurant.address.street}, ${restaurant.address.district}\n${restaurant.address.city}` },
    { Icon: Phone, title: 'Par téléphone', text: restaurant.phone, href: restaurant.phoneHref },
    { Icon: WhatsAppIcon, title: 'Par WhatsApp', text: restaurant.whatsapp, href: `https://wa.me/${restaurant.whatsappNumber}` },
  ];

  return (
    <>
      <PageHero
        eyebrow="Réservation"
        title="Réservez votre table"
        subtitle="Choisissez votre date et votre créneau : notre équipe vous rappelle pour confirmer votre réservation."
        image={images.wine}
        crumb="Réservation"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_340px]">
          <Reveal>
            <ReservationForm />
          </Reveal>

          <aside className="space-y-4">
            {info.map(({ Icon, title, text, href }) => {
              const body = (
                <>
                  <Icon className="h-6 w-6 shrink-0 text-gold-dark" strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.7rem] font-semibold tracking-[0.15em] text-muted uppercase">{title}</p>
                    <p className="mt-1 text-sm font-medium whitespace-pre-line text-ink">{text}</p>
                  </div>
                </>
              );
              const cls = 'flex gap-4 rounded-sm bg-white p-5 ring-1 ring-sand';
              return (
                <Reveal key={title}>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`${cls} transition hover:ring-gold`}>
                      {body}
                    </a>
                  ) : (
                    <div className={cls}>{body}</div>
                  )}
                </Reveal>
              );
            })}
            <Reveal className="rounded-sm bg-ink p-6 text-sm text-cream/75">
              <ShieldCheck className="h-6 w-6 text-gold" strokeWidth={1.5} />
              <p className="mt-3">
                Votre table est conservée <strong className="text-cream">15 minutes</strong> après l’heure prévue. En cas d’empêchement, merci de nous prévenir.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
