import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { eventTypes, images, restaurant } from '@shared/content.js';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import { doualaToday, Field, FormAlert } from '../components/Field.jsx';
import { api } from '../lib/api.js';
import useDocumentTitle from '../hooks/useDocumentTitle.js';

const initial = { name: '', phone: '', email: '', eventType: '', date: '', guests: '', message: '' };

function InquiryForm() {
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
      await api.eventInquiry(form);
      setStatus('sent');
      setForm(initial);
    } catch (err) {
      setStatus('idle');
      setServerError(err.message);
      setErrors(err.errors || {});
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center rounded-sm bg-ink-2 p-10 text-center ring-1 ring-line">
        <CheckCircle2 className="h-12 w-12 text-gold" />
        <h3 className="mt-5 font-serif text-2xl text-cream">Demande envoyée !</h3>
        <p className="mt-3 max-w-sm text-sm text-cream/70">
          Merci ! Notre équipe vous recontacte rapidement pour construire ensemble votre événement.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-outline mt-7">
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-sm bg-ink-2 p-6 ring-1 ring-line sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field dark label="Nom" id="ev-name" required error={errors.name}>
          <input id="ev-name" className="field-dark" value={form.name} onChange={set('name')} autoComplete="name" />
        </Field>
        <Field dark label="Téléphone" id="ev-phone" required error={errors.phone}>
          <input id="ev-phone" type="tel" className="field-dark" value={form.phone} onChange={set('phone')} autoComplete="tel" />
        </Field>
        <Field dark label="E-mail" id="ev-email" error={errors.email} className="sm:col-span-2">
          <input id="ev-email" type="email" className="field-dark" value={form.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <Field dark label="Type d’événement" id="ev-type" required error={errors.eventType} className="sm:col-span-2">
          <select id="ev-type" className="field-dark" value={form.eventType} onChange={set('eventType')}>
            <option value="">Choisir…</option>
            {eventTypes.map((t) => (
              <option key={t.id} value={t.title}>
                {t.title}
              </option>
            ))}
            <option value="Autre">Autre</option>
          </select>
        </Field>
        <Field dark label="Date souhaitée" id="ev-date" error={errors.date}>
          <input id="ev-date" type="date" min={doualaToday()} className="field-dark [color-scheme:dark]" value={form.date} onChange={set('date')} />
        </Field>
        <Field dark label="Invités" id="ev-guests" error={errors.guests}>
          <input id="ev-guests" type="number" min="1" className="field-dark" value={form.guests} onChange={set('guests')} placeholder="Ex. 30" />
        </Field>
        <Field dark label="Votre projet" id="ev-message" className="sm:col-span-2">
          <textarea
            id="ev-message"
            rows={4}
            className="field-dark resize-none"
            value={form.message}
            onChange={set('message')}
            placeholder="Budget, formule (menu, buffet, cocktail), besoins particuliers…"
          />
        </Field>
      </div>
      {serverError && (
        <div className="mt-5">
          <FormAlert>{serverError}</FormAlert>
        </div>
      )}
      <button type="submit" disabled={status === 'sending'} className="btn-gold mt-7 w-full">
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Envoyer ma demande
      </button>
    </form>
  );
}

export default function Events() {
  useDocumentTitle('Événements');
  return (
    <>
      <PageHero
        eyebrow="Événements & privatisation"
        title="Vos moments d’exception"
        subtitle="Anniversaires, repas d’affaires, buffets, cocktails ou soirées lounge : nous créons l’événement à votre image."
        image={images.toast}
        crumb="Événements"
      />

      <section className="bg-cream py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Nos formules" title="Un lieu, mille occasions" align="center">
            Salle principale, cour intérieure arborée ou espace lounge : nos équipes vous accompagnent de la conception du menu jusqu’au dernier café.
          </SectionHeading>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {eventTypes.map((ev, i) => (
              <Reveal key={ev.id} delay={(i % 2) * 120} className="group grid overflow-hidden rounded-sm bg-white ring-1 ring-sand sm:grid-cols-[0.9fr_1fr]">
                <div className="relative min-h-[220px] overflow-hidden">
                  <img src={ev.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-7">
                  <span className="font-serif text-4xl text-gold/40">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl font-semibold">{ev.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{ev.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-ink py-20 text-cream sm:py-28">
        <img src={images.banquet} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20" />
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Organisons ensemble" dark title="Parlez-nous de votre événement">
              Remplissez ce formulaire et nous revenons vers vous avec une proposition sur mesure. Vous préférez parler de vive voix ?
            </SectionHeading>
            <Reveal className="mt-8 space-y-3 text-sm">
              <a href={restaurant.phoneHref} className="flex items-center gap-3 text-cream/80 hover:text-gold">
                <span className="h-px w-8 bg-gold" /> Appelez le <strong className="text-cream">{restaurant.phone}</strong>
              </a>
              <a href={`https://wa.me/${restaurant.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold">
                <span className="h-px w-8 bg-gold" /> WhatsApp <strong className="text-cream">{restaurant.whatsapp}</strong>
              </a>
            </Reveal>
          </div>
          <Reveal>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
