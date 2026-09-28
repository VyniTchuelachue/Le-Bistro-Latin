import { Link } from 'react-router-dom';

export function PalmMark({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 48 40" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M24 38V18" />
      <path d="M24 19c-3-7-10-10-18-9 6 1 11 4 13 9" />
      <path d="M24 19c3-7 10-10 18-9-6 1-11 4-13 9" />
      <path d="M24 18c-5-4-12-4-17 0 5-1 10 0 13 3" />
      <path d="M24 18c5-4 12-4 17 0-5-1-10 0-13 3" />
      <path d="M24 18c-2-6 0-12 4-16-1 5-2 10-4 16" />
      <path d="M24 18c2-6 0-12-4-16 1 5 2 10 4 16" />
    </svg>
  );
}

export default function Logo({ size = 'md', className = '' }) {
  const big = size === 'lg';
  return (
    <Link to="/" className={`group inline-flex flex-col items-center leading-none text-gold ${className}`} aria-label="Le Bistro Latin — accueil">
      <span className="relative flex items-end">
        <span className={`font-script italic font-semibold tracking-tight ${big ? 'text-5xl' : 'text-[2rem]'}`}>
          Le Bistro Latin
        </span>
        <PalmMark
          className={`absolute left-1/2 -translate-x-[18%] transition-transform duration-500 group-hover:-rotate-6 ${
            big ? '-top-7 h-8 w-8' : '-top-5 h-6 w-6'
          }`}
        />
      </span>
      <span className={`mt-1 font-sans font-semibold tracking-[0.32em] text-gold/90 uppercase ${big ? 'text-[0.62rem]' : 'text-[0.5rem]'}`}>
        Restaurant &amp; Lounge
      </span>
    </Link>
  );
}
