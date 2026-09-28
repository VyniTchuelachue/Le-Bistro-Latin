import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, children, align = 'left', dark = false, className = '' }) {
  const center = align === 'center';
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${dark ? 'text-gold' : ''} ${center ? 'justify-center' : ''} flex items-center gap-3`}>
          {!center && <span className="h-px w-8 bg-current" />}
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-serif text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-cream' : 'text-ink'}`}>
        {title}
      </h2>
      {children && <div className={`mt-4 text-[0.95rem] leading-relaxed ${dark ? 'text-cream/70' : 'text-muted'}`}>{children}</div>}
    </Reveal>
  );
}
