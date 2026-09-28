import { restaurant } from '@shared/content.js';

// Douala is on West Africa Time (UTC+1, no daylight saving).
function nowInDouala() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  return { day: d.getUTCDay(), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

export function openStatus() {
  const { day, minutes } = nowInDouala();
  const today = restaurant.hours[day];

  if (today.open && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Ouvert · ferme à ${today.close.replace(':', 'h')}` };
  }
  if (today.open && minutes < toMinutes(today.open)) {
    return { open: false, label: `Fermé · ouvre à ${today.open.replace(':', 'h')}` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = restaurant.hours[(day + i) % 7];
    if (next.open) {
      const when = i === 1 ? 'demain' : next.day.toLowerCase();
      return { open: false, label: `Fermé · ouvre ${when} à ${next.open.replace(':', 'h')}` };
    }
  }
  return { open: false, label: 'Fermé' };
}

export const todayIndex = () => nowInDouala().day;
