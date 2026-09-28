import { useEffect, useState } from 'react';
import { CalendarCheck2, Loader2, Minus, Plus, RotateCcw } from 'lucide-react';
import { reservationRules, restaurant } from '@shared/content.js';
import { api } from '../lib/api.js';
import { doualaToday, Field, FormAlert } from './Field.jsx';
import { WhatsAppIcon } from './BrandIcons.jsx';

const occasions = ['Dîner romantique', 'Anniversaire', 'Repas d’affaires', 'Entre amis', 'En famille', 'Autre'];

const initial = { name: '', phone: '', email: '', date: '', time: '', guests: 2, occasion: '', message: '' };

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export default function ReservationForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [availability, setAvailability] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState(null);

  const set = (key) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  useEffect(() => {
    if (!form.date) return setAvailability(null);
    let cancelled = false;
    setLoadingSlots(true);
    api
      .availability(form.date)
      .then((data) => {
        if (cancelled) return;
        setAvailability(data);
        setForm((f) => (data.slots.includes(f.time) ? f : { ...f, time: '' }));
      })
      .catch((err) => !cancelled && setAvailability({ open: false, reason: err.message, slots: [] }))
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [form.date]);

  async function onSubmit(e) {
    e.preventDefault();
    setServerError('');

    const local = {};
    if (form.name.trim().length < 2) local.name = 'Merci d’indiquer votre nom.';
    if (form.phone.replace(/\D/g, '').length < 8) local.phone = 'Numéro de téléphone invalide.';
    if (!form.date) local.date = 'Choisissez une date.';
    else if (!form.time) local.time = 'Choisissez un horaire.';
    if (Object.keys(local).length) return setErrors(local);

    setSubmitting(true);
    try {
      setResult(await api.reserve(form));
      window.scrollTo({ top: document.getElementById('reservation-form')?.offsetTop - 100 || 0, behavior: 'smooth' });
    } catch (err) {
      setServerError(err.message);
      setErrors(err.errors || {});
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    const r = result.reservation;
    return (
      <div className="rounded-sm bg-white p-8 text-center shadow-[0_30px_80px_-40px_rgba(14,12,10,0.5)] ring-1 ring-sand sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-dark">
          <CalendarCheck2 className="h-8 w-8" />
        </span>
        <h3 className="mt-6 font-serif text-3xl font-semibold">Merci, {r.name.split(' ')[0]} !</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Votre demande de réservation a bien été enregistrée. Notre équipe vous contactera au <strong className="text-ink">{r.phone}</strong> pour la confirmer.
        </p>
        <dl className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-sm bg-sand text-left text-sm">
          {[
            ['Référence', r.reference],
            ['Personnes', r.guests],
            ['Date', formatDate(r.date)],
            ['Heure', r.time.replace(':', 'h')],
          ].map(([k, v]) => (
            <div key={k} className="bg-cream p-4">
              <dt className="text-[0.65rem] font-semibold tracking-[0.15em] text-muted uppercase">{k}</dt>
              <dd className="mt-1 font-semibold text-ink first-letter:uppercase">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={result.whatsappUrl} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:bg-[#1ebe5b]">
            <WhatsAppIcon className="h-4 w-4" /> Confirmer par WhatsApp
          </a>
          <button
            type="button"
            className="btn border border-sand text-ink hover:border-gold"
            onClick={() => {
              setResult(null);
              setForm(initial);
            }}
          >
            <RotateCcw className="h-4 w-4" /> Nouvelle réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="reservation-form"
      onSubmit={onSubmit}
      noValidate
      className="rounded-sm bg-white p-6 shadow-[0_30px_80px_-40px_rgba(14,12,10,0.5)] ring-1 ring-sand sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" id="name" required error={errors.name}>
          <input id="name" className="field" value={form.name} onChange={set('name')} autoComplete="name" placeholder="Ex. Marie Ngo" />
        </Field>
        <Field label="Téléphone" id="phone" required error={errors.phone}>
          <input
            id="phone"
            type="tel"
            className="field"
            value={form.phone}
            onChange={set('phone')}
            autoComplete="tel"
            placeholder="+237 6XX XX XX XX"
          />
        </Field>
        <Field label="E-mail" id="email" error={errors.email}>
          <input id="email" type="email" className="field" value={form.email} onChange={set('email')} autoComplete="email" placeholder="facultatif" />
        </Field>
        <Field label="Nombre de personnes" id="guests" required error={errors.guests}>
          <div className="flex h-[46px] items-stretch overflow-hidden rounded-sm border border-sand bg-white">
            <button
              type="button"
              aria-label="Retirer une personne"
              onClick={() => set('guests')(Math.max(1, form.guests - 1))}
              className="grid w-12 place-items-center text-ink transition hover:bg-cream-2"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              id="guests"
              type="number"
              min="1"
              max={reservationRules.maxGuests}
              value={form.guests}
              onChange={(e) => set('guests')(Math.min(reservationRules.maxGuests, Math.max(1, Number(e.target.value) || 1)))}
              className="w-full border-x border-sand text-center text-sm font-semibold focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              aria-label="Ajouter une personne"
              onClick={() => set('guests')(Math.min(reservationRules.maxGuests, form.guests + 1))}
              className="grid w-12 place-items-center text-ink transition hover:bg-cream-2"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </Field>
        <Field label="Date" id="date" required error={errors.date} className="sm:col-span-2">
          <input
            id="date"
            type="date"
            className="field"
            value={form.date}
            min={doualaToday()}
            max={doualaToday(reservationRules.maxDaysAhead)}
            onChange={set('date')}
          />
          <p className="mt-1.5 text-xs text-muted">
            {restaurant.hoursSummary} · {restaurant.closedSummary.toLowerCase()}.
          </p>
        </Field>

        <div className="sm:col-span-2">
          <span className="label text-ink/70">
            Horaire <span className="text-gold-dark">*</span>
          </span>
          {!form.date && <p className="rounded-sm border border-dashed border-sand px-4 py-4 text-sm text-muted">Choisissez d’abord une date pour voir les créneaux disponibles.</p>}
          {form.date && loadingSlots && (
            <p className="flex items-center gap-2 px-1 py-4 text-sm text-muted">
              <Loader2 className="h-4 w-4 animate-spin" /> Chargement des créneaux…
            </p>
          )}
          {form.date && !loadingSlots && availability && !availability.open && (
            <p className="rounded-sm bg-cream-2 px-4 py-4 text-sm text-ink/80">{availability.reason}</p>
          )}
          {form.date && !loadingSlots && availability?.open && (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6" role="radiogroup" aria-label="Horaires disponibles">
              {availability.slots.map((slot) => {
                const active = form.time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => set('time')(slot)}
                    className={`rounded-sm border py-2.5 text-sm font-semibold transition ${
                      active ? 'border-gold bg-gold text-ink' : 'border-sand bg-white text-ink/80 hover:border-gold'
                    }`}
                  >
                    {slot.replace(':', 'h')}
                  </button>
                );
              })}
            </div>
          )}
          {errors.time && <p className="mt-1.5 text-xs text-red-600">{errors.time}</p>}
        </div>

        <Field label="Occasion" id="occasion" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {occasions.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => set('occasion')(form.occasion === o ? '' : o)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                  form.occasion === o ? 'border-ink bg-ink text-cream' : 'border-sand text-ink/75 hover:border-ink'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Demande particulière" id="message" className="sm:col-span-2">
          <textarea
            id="message"
            rows={3}
            className="field resize-none"
            value={form.message}
            onChange={set('message')}
            placeholder="Allergies, chaise bébé, table en terrasse, gâteau d’anniversaire…"
          />
        </Field>
      </div>

      {serverError && (
        <div className="mt-6">
          <FormAlert>{serverError}</FormAlert>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-xs text-muted">
          Groupe de plus de {reservationRules.maxGuests} personnes ? Appelez le{' '}
          <a href={restaurant.phoneHref} className="font-semibold text-ink underline decoration-gold underline-offset-2">
            {restaurant.phone}
          </a>
        </p>
        <button type="submit" disabled={submitting} className="btn-gold w-full sm:w-auto">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck2 className="h-4 w-4" />}
          {submitting ? 'Envoi…' : 'Confirmer la réservation'}
        </button>
      </div>
    </form>
  );
}
