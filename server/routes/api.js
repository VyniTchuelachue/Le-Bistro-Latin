import { Router } from 'express';
import * as content from '../../shared/content.js';
import { createCollection } from '../lib/store.js';
import { rateLimit } from '../lib/rateLimit.js';
import { slotsForDate, validateContact, validateEventInquiry, validateReservation } from '../lib/validation.js';

const router = Router();
const reservations = createCollection('reservations');
const messages = createCollection('messages');
const inquiries = createCollection('event-inquiries');
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 8 });

const whatsappLink = (text) =>
  `https://wa.me/${content.restaurant.whatsappNumber}?text=${encodeURIComponent(text)}`;

// --- Public content --------------------------------------------------------
router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.get('/info', (req, res) => res.json(content.restaurant));
router.get('/menu', (req, res) => res.json(content.menuCategories));
router.get('/specialties', (req, res) => res.json(content.specialties));
router.get('/testimonials', (req, res) => res.json(content.testimonials));
router.get('/events', (req, res) => res.json(content.eventTypes));
router.get('/gallery', (req, res) => res.json(content.gallery));

router.get('/availability', (req, res) => {
  res.json(slotsForDate(String(req.query.date || '')));
});

// --- Forms -----------------------------------------------------------------
router.post('/reservations', formLimiter, async (req, res, next) => {
  try {
    const { data, errors, valid } = validateReservation(req.body);
    if (!valid) return res.status(422).json({ error: 'Merci de vérifier le formulaire.', errors });

    const record = await reservations.insert({ ...data, status: 'en attente' });
    const [y, m, d] = data.date.split('-');
    const summary =
      `Bonjour Le Bistro Latin, je souhaite confirmer ma réservation :\n` +
      `• Nom : ${data.name}\n• Date : ${d}/${m}/${y} à ${data.time}\n• Personnes : ${data.guests}` +
      (data.occasion ? `\n• Occasion : ${data.occasion}` : '') +
      `\n• Réf : ${record.id.slice(0, 8).toUpperCase()}`;

    res.status(201).json({
      reservation: { id: record.id, reference: record.id.slice(0, 8).toUpperCase(), ...data, status: record.status },
      whatsappUrl: whatsappLink(summary),
    });
  } catch (err) {
    next(err);
  }
});

router.post('/contact', formLimiter, async (req, res, next) => {
  try {
    const { data, errors, valid } = validateContact(req.body);
    if (!valid) return res.status(422).json({ error: 'Merci de vérifier le formulaire.', errors });
    await messages.insert(data);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.post('/events/inquiry', formLimiter, async (req, res, next) => {
  try {
    const { data, errors, valid } = validateEventInquiry(req.body);
    if (!valid) return res.status(422).json({ error: 'Merci de vérifier le formulaire.', errors });
    await inquiries.insert(data);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// --- Staff (protected by ADMIN_TOKEN) ---------------------------------------
function requireAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return res.status(503).json({ error: 'ADMIN_TOKEN non configuré sur le serveur.' });
  if (req.get('x-admin-token') !== token) return res.status(401).json({ error: 'Non autorisé.' });
  next();
}

router.get('/admin/reservations', requireAdmin, async (req, res) => {
  const items = await reservations.readAll();
  res.json(items.sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)));
});
router.get('/admin/messages', requireAdmin, async (req, res) => res.json(await messages.readAll()));
router.get('/admin/event-inquiries', requireAdmin, async (req, res) => res.json(await inquiries.readAll()));

router.use((req, res) => res.status(404).json({ error: 'Route introuvable.' }));

export default router;
