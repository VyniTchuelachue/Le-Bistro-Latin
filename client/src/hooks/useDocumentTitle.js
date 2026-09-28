import { useEffect } from 'react';

const BASE = 'Le Bistro Latin';

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${BASE}` : `${BASE} — Restaurant & Lounge à Bonapriso, Douala`;
  }, [title]);
}
