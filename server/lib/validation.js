import { restaurant, reservationRules } from '../../shared/content.js';

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const fromMinutes = (mins) =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{8,20}$/;

const clean = (value, max = 200) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

// Douala is UTC+1 all year (no DST).
function todayInDouala() {
  return new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 10);
}

function parseDate(dateStr) {
  if (!DATE_RE.test(dateStr)) return null;
  const date = new Date(`${dateStr}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateStr ? null : date;
}

export function slotsForDate(dateStr) {
  const date = parseDate(dateStr);
  if (!date) return { open: false, reason: 'Date invalide.', slots: [] };

  const hours = restaurant.hours[date.getUTCDay()];
  if (!hours.open) return { open: false, reason: `Le restaurant est fermé le ${hours.day.toLowerCase()}.`, slots: [] };

  const today = todayInDouala();
  if (dateStr < today) return { open: false, reason: 'Cette date est passée.', slots: [] };

  const maxDate = new Date(`${today}T00:00:00Z`);
  maxDate.setUTCDate(maxDate.getUTCDate() + reservationRules.maxDaysAhead);
  if (date > maxDate) {
    return { open: false, reason: `Réservations ouvertes jusqu’à ${reservationRules.maxDaysAhead} jours à l’avance.`, slots: [] };
  }

  const slots = [];
  for (
    let t = toMinutes(reservationRules.firstSeating);
    t <= toMinutes(reservationRules.lastSeating);
    t += reservationRules.intervalMinutes
  ) {
    slots.push(fromMinutes(t));
  }

  // Hide slots that are already past (with 30 min notice) when booking for today.
  if (dateStr === today) {
    const now = new Date(Date.now() + 60 * 60 * 1000);
    const cutoff = now.getUTCHours() * 60 + now.getUTCMinutes() + 30;
    const remaining = slots.filter((s) => toMinutes(s) >= cutoff);
    if (!remaining.length) return { open: false, reason: 'Plus de créneaux disponibles aujourd’hui.', slots: [] };
    return { open: true, slots: remaining };
  }

  return { open: true, slots };
}

export function validateReservation(body = {}) {
  const errors = {};
  const data = {
    name: clean(body.name, 80),
    phone: clean(body.phone, 25),
    email: clean(body.email, 120),
    date: clean(body.date, 10),
    time: clean(body.time, 5),
    guests: Number.parseInt(body.guests, 10),
    occasion: clean(body.occasion, 60),
    message: clean(body.message, 1000),
  };

  if (data.name.length < 2) errors.name = 'Merci d’indiquer votre nom.';
  if (!PHONE_RE.test(data.phone)) errors.phone = 'Numéro de téléphone invalide.';
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'Adresse e-mail invalide.';
  if (!Number.isInteger(data.guests) || data.guests < 1 || data.guests > reservationRules.maxGuests) {
    errors.guests = `Entre 1 et ${reservationRules.maxGuests} personnes. Pour un groupe plus important, contactez-nous.`;
  }

  const availability = slotsForDate(data.date);
  if (!availability.open) errors.date = availability.reason;
  else if (!TIME_RE.test(data.time) || !availability.slots.includes(data.time)) errors.time = 'Créneau horaire indisponible.';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

// Name + at least one way to reach the person back.
function validateIdentity(body, errors) {
  const data = {
    name: clean(body.name, 80),
    email: clean(body.email, 120),
    phone: clean(body.phone, 25),
  };
  if (data.name.length < 2) errors.name = 'Merci d’indiquer votre nom.';
  if (!data.email && !data.phone) errors.phone = 'Indiquez un téléphone ou un e-mail.';
  if (data.email && !EMAIL_RE.test(data.email)) errors.email = 'Adresse e-mail invalide.';
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'Numéro de téléphone invalide.';
  return data;
}

export function validateContact(body = {}) {
  const errors = {};
  const data = {
    ...validateIdentity(body, errors),
    subject: clean(body.subject, 120),
    message: clean(body.message, 2000),
  };
  if (data.message.length < 10) errors.message = 'Votre message est un peu court.';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}

export function validateEventInquiry(body = {}) {
  const errors = {};
  const data = {
    ...validateIdentity(body, errors),
    eventType: clean(body.eventType, 60),
    date: clean(body.date, 10),
    guests: Number.parseInt(body.guests, 10) || null,
    message: clean(body.message, 2000),
  };

  if (!data.eventType) errors.eventType = 'Choisissez un type d’événement.';
  if (data.date && (!parseDate(data.date) || data.date < todayInDouala())) errors.date = 'Date invalide.';
  if (data.guests !== null && (data.guests < 1 || data.guests > 500)) errors.guests = 'Nombre d’invités invalide.';

  return { data, errors, valid: Object.keys(errors).length === 0 };
}
