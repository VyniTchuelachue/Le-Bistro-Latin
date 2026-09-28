// Brand glyphs (lucide-react no longer ships brand logos).
const base = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };

export const InstagramIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M13.5 21.9v-7.7h2.6l.4-3h-3V9.3c0-.9.3-1.5 1.5-1.5h1.6V5.1c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v7.7h3.1Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = 'h-5 w-5' }) => (
  <svg {...base} className={className}>
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6A11.8 11.8 0 0 0 23.8 12c0-3.2-1.2-6.1-3.4-8.4Z" />
  </svg>
);

export const TripadvisorIcon = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className={className}>
    <circle cx="6.8" cy="13.5" r="3.6" />
    <circle cx="17.2" cy="13.5" r="3.6" />
    <circle cx="6.8" cy="13.5" r="1" fill="currentColor" />
    <circle cx="17.2" cy="13.5" r="1" fill="currentColor" />
    <path d="M2.5 9.2 3.8 10.6M21.5 9.2l-1.3 1.4M3.8 9.9C6.2 8 9 7 12 7s5.8 1 8.2 2.9M12 16.8l-1.6-2.1M12 16.8l1.6-2.1" strokeLinecap="round" />
  </svg>
);
