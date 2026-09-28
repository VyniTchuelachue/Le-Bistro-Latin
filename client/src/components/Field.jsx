import { AlertCircle, CheckCircle2 } from 'lucide-react';

export function Field({ label, error, id, required, dark = false, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={`label ${dark ? 'text-cream/70' : 'text-ink/70'}`}>
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </div>
  );
}

export function FormAlert({ type = 'error', children }) {
  const ok = type === 'success';
  const Icon = ok ? CheckCircle2 : AlertCircle;
  return (
    <div
      role={ok ? 'status' : 'alert'}
      className={`flex items-start gap-3 rounded-sm border px-4 py-3 text-sm ${
        ok ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}

// Today's date in Douala (UTC+1) as YYYY-MM-DD.
export function doualaToday(offsetDays = 0) {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}
