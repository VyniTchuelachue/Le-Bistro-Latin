import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { CalendarDays, Menu as MenuIcon, Phone, X } from 'lucide-react';
import { restaurant } from '@shared/content.js';
import Logo from './Logo.jsx';
import { FacebookIcon, InstagramIcon } from './BrandIcons.jsx';

export const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/restaurant', label: 'Notre Restaurant' },
  { to: '/menu', label: 'Notre Menu' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/evenements', label: 'Événements' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid ? 'bg-ink/95 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md' : 'bg-gradient-to-b from-black/60 to-transparent py-5'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6">
          <Logo className="pt-3" />
  
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-[0.8rem] font-medium tracking-wide transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                    isActive ? 'text-gold after:w-full' : 'text-cream/85 after:w-0 hover:text-gold hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
  
          <div className="flex items-center gap-3">
            <Link to="/reservation" className="btn-gold hidden px-5! py-3! sm:inline-flex">
              Réserver une table <CalendarDays className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-cream transition hover:border-gold hover:text-gold lg:hidden"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — kept outside <header>: its backdrop-filter would
          otherwise become the containing block for this fixed panel. */}
      <div
        className={`fixed inset-0 z-[45] overflow-y-auto bg-ink pt-[88px] transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <nav className="container-x flex min-h-full flex-col pt-4 pb-10" aria-label="Navigation mobile">
          {navLinks.map((link, i) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              className={({ isActive }) =>
                `border-b border-line py-4 font-serif text-2xl transition-all duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${isActive ? 'text-gold' : 'text-cream'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-auto space-y-4">
            <Link to="/reservation" className="btn-gold w-full">
              Réserver une table <CalendarDays className="h-4 w-4" />
            </Link>
            <a href={restaurant.phoneHref} className="btn-outline w-full">
              <Phone className="h-4 w-4" /> {restaurant.phone}
            </a>
            <div className="flex justify-center gap-5 pt-2 text-cream/70">
              <a href={restaurant.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold">
                <InstagramIcon />
              </a>
              <a href={restaurant.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold">
                <FacebookIcon />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
