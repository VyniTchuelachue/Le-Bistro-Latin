# Le Bistro Latin — Site web

Site du restaurant **Le Bistro Latin** (Rue Batibois, Bonapriso — Douala).
React 19 + Tailwind CSS v4 (Vite) côté client, Node.js / Express côté serveur.

## Démarrage

```bash
npm install        # installe client + serveur (npm workspaces)
npm run dev        # API sur :5000 + site sur http://localhost:5173
```

Production :

```bash
npm run build      # construit client/dist
npm start          # Express sert le site + l'API sur $PORT (5000 par défaut)
```

## Structure

```
shared/content.js     ← TOUT le contenu : infos, horaires, menu, prix, avis, galerie
server/               ← API Express (réservations, contact, événements)
  data/*.json         ← demandes enregistrées (créées automatiquement)
client/src/
  pages/              ← Accueil, Restaurant, Menu, Galerie, Événements, Contact, Réservation
  components/         ← Navbar, Footer, formulaires, cartes…
```

Pour modifier un plat, un prix, les horaires ou une photo : éditez `shared/content.js`.
Le site et l'API se mettent à jour automatiquement.

## API

| Méthode | Route                        | Description                                  |
| ------- | ---------------------------- | -------------------------------------------- |
| GET     | `/api/info`, `/api/menu`, …  | Contenu du restaurant                        |
| GET     | `/api/availability?date=`    | Créneaux disponibles (fermé le dimanche)     |
| POST    | `/api/reservations`          | Demande de réservation (+ lien WhatsApp)     |
| POST    | `/api/contact`               | Message de contact                           |
| POST    | `/api/events/inquiry`        | Demande de privatisation / événement         |
| GET     | `/api/admin/reservations`    | Liste des réservations (en-tête `x-admin-token`) |

Définissez `ADMIN_TOKEN` pour activer les routes `/api/admin/*` :

```bash
ADMIN_TOKEN=un-secret npm start
curl -H "x-admin-token: un-secret" http://localhost:5000/api/admin/reservations
```

Variables : `PORT` (production), `API_PORT` / `VITE_PORT` (développement), `CORS_ORIGIN`, `ADMIN_TOKEN`.

## À compléter avant la mise en ligne

- **Prix & plats** : la carte reprend le style de la maison (foie gras maison, bresaola, rougets, paella,
  pâtes, touches japonaises…) mais les prix sont indicatifs → à valider avec le restaurant.
- **Avis clients** : les témoignages de `shared/content.js` sont des exemples → remplacer par de vrais avis.
- **Photos** : images Unsplash libres de droits → idéalement remplacer par les photos du restaurant.
- **E-mail** : aucune adresse officielle trouvée ; champ `email` prévu dans `shared/content.js`.
- **Notifications** : les demandes sont enregistrées dans `server/data/`. Pour être alerté en temps réel,
  brancher un envoi d'e-mail/SMS dans `server/routes/api.js`.
