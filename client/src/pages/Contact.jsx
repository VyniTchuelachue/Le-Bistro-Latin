import { useState } from 'react';
import { Car, Clock, CreditCard, Loader2, MapPin, Navigation, Phone, Send } from 'lucide-react';
import { images, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Field, FormAlert } from '../components/Field.jsx';
import { WhatsAppIcon } from '../components/BrandIcons.jsx';
import { api } from '../lib/api.js';
import { openStatus, todayIndex } from '../lib/hours.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const initial = { name: '', email: '', phone: '', subject: '', message: '' };

function ContactForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setServerError('');
    try {
      await api.contact(form);
      setStatus('sent');
      setForm(initial);
    } catch (err) {
      setStatus('idle');
      setServerError(err.message);
      setErrors(err.errors || {});
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-sm bg-white p-6 shadow-[0_30px_80px_-40px_rgba(14,12,10,0.5)] ring-1 ring-sand sm:p-10">
      <h2 className="font-serif text-3xl font-semibold">Écrivez-nous</h2>
      <p className="mt-2 text-sm text-muted">Une question, une suggestion ? Nous vous répondons rapidement.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Nom" id="c-name" required error={errors.name} className="sm:col-span-2">
          <input id="c-name" className="field" value={form.name} onChange={set('name')} autoComplete="name" />
        </Field>
        <Field label="Téléphone" id="c-phone" error={errors.phone}>
          <input id="c-phone" type="tel" className="field" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
        <Field label="E-mail" id="c-email" error={errors.email}>
          <input id="c-email" type="email" className="field" value={form.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field label="Sujet" id="c-subject" className="sm:col-span-2">
          <input id="c-subject" className="field" value={form.subject} onChange={set('subject')} />
        </Field>
        <Field label="Message" id="c-message" required error={errors.message} className="sm:col-span-2">
          <textarea id="c-message" rows={5} className="field resize-none" value={form.message} onChange={set('message')} />
        </Field>
      </div>
      <div className="mt-6 space-y-4">
        {serverError && <FormAlert>{serverError}</FormAlert>}
        {status === 'sent' && <FormAlert type="success">Merci ! Votre message a bien été envoyé.</FormAlert>}
      </div>
      <button type="submit" disabled={status === 'sending'} className="btn-gold mt-6 w-full sm:w-auto">
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Envoyer le message
      </button>
    </form>
  );
}

export default function Contact() {
  useDocumentTitle('Contact');
  const status = openStatus();
  const today = todayIndex();
  const { address } = restaurant;
  // Monday-first display order.
  const week = [1, 2, 3, 4, 5, 6, 0].map((i) => ({ ...restaurant.hours[i], index: i }));

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Venez nous rendre visite"
        subtitle={`${address.street}, ${address.district} — ${address.city}. Nous serons ravis de vous accueillir.`}
        image={images.interiorDark}
        crumb="Contact"
      />

      <section className="bg-cream py-20 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <Reveal className="rounded-sm bg-ink p-8 text-cream">
              <ul className="space-y-6 text-sm">
                <li className="flex gap-4">
                  <MapPin className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="mt-1 text-cream/70">
                      {address.street}, quartier {address.district}
                      <br />
                      {address.postalBox} · {address.city}, {address.country}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Phone className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <a href={restaurant.phoneHref} className="mt-1 block text-cream/70 hover:text-gold">
                      {restaurant.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <WhatsAppIcon className="h-6 w-6 shrink-0 text-gold" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <a href={`https://wa.me/${restaurant.whatsappNumber}`} target="_blank" rel="noreferrer" className="mt-1 block text-cream/70 hover:text-gold">
                      {restaurant.whatsapp}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Car className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold">Accès</p>
                    <p className="mt-1 text-cream/70">Parking disponible sur place</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CreditCard className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                  <div>
                    <p className="font-semibold">Paiement</p>
                    <p className="mt-1 text-cream/70">Espèces, cartes bancaires & paiements mobiles</p>
                  </div>
                </li>
              </ul>
              <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold mt-8 w-full">
                <Navigation className="h-4 w-4" /> Itinéraire Google Maps
              </a>
            </Reveal>

            <Reveal className="rounded-sm bg-white p-8 ring-1 ring-sand">
              <div className="flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-3 font-serif text-xl font-semibold">
                  <Clock className="h-5 w-5 text-gold-dark" /> Horaires
                </h2>
                <span className={`rounded-full px-3 py-1 text-[0.7rem] font-semibold ${status.open ? 'bg-emerald-50 text-emerald-700' : 'bg-cream-2 text-muted'}`}>
                  {status.label}
                </span>
              </div>
              <ul className="mt-5 divide-y divide-sand text-sm">
                {week.map((d) => (
                  <li key={d.day} className={`flex justify-between py-2.5 ${d.index === today ? 'font-semibold text-ink' : 'text-muted'}`}>
                    <span>
                      {d.day} {d.index === today && <span className="ml-1 text-[0.65rem] text-gold-dark uppercase">aujourd’hui</span>}
                    </span>
                    <span>{d.open ? `${d.open.replace(':', 'h')} – ${d.close.replace(':', 'h')}` : 'Fermé'}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="h-[420px] bg-ink-3" aria-label="Carte">
        <iframe
          title="Le Bistro Latin sur Google Maps"
          src={restaurant.mapsEmbed}
          className="h-full w-full grayscale-[40%] contrast-[1.05]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </section>
    </>
  );
}
