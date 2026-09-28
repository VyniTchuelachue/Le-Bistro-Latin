import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { restaurant } from '@shared/content.js';
import { WhatsAppIcon } from './BrandIcons.jsx';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const waText = encodeURIComponent('Bonjour Le Bistro Latin, je souhaiterais avoir des informations.');

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Revenir en haut"
        className={`grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-ink/90 text-gold shadow-lg backdrop-blur transition-all duration-300 hover:bg-gold hover:text-ink ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <a
        href={`https://wa.me/${restaurant.whatsappNumber}?text=${waText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Nous écrire sur WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" />
        <WhatsAppIcon className="relative h-7 w-7" />
      </a>
    </div>
  );
}
