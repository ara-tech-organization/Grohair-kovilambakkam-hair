import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CLINIC } from '../config.js';

/** Centered call modal. Opens right after the form popup is closed (`ready`), on every page load. */
export default function CallPopup({ ready = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CLINIC.phone || !ready) return;
    const t = setTimeout(() => setOpen(true), 400);
    return () => clearTimeout(t);
  }, [ready]);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={close} className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-5">
      <div role="dialog" aria-modal="true" aria-labelledby="call-title" onClick={(e) => e.stopPropagation()}
        className="sheet relative w-full max-w-[22rem] rounded-[1.75rem] bg-white px-7 pb-7 pt-10 text-center text-ink shadow-soft">
        <button onClick={close} aria-label="Close call prompt" className="absolute right-4 top-4 rounded-full p-1.5 text-ink/50 transition hover:bg-ink/10">
          <X size={20} aria-hidden />
        </button>
        <div className="mx-auto mb-5 grid h-[5.5rem] w-[5.5rem] place-items-center rounded-full bg-crimson-600/10">
          <div className="grad-crimson grid h-[4.25rem] w-[4.25rem] place-items-center rounded-full text-white">
            <Phone size={28} aria-hidden />
          </div>
        </div>
        <h2 id="call-title" className="text-xl font-semibold leading-snug">Call Advanced GroHair &amp; GloSkin</h2>
        <p className="mt-1.5 text-sm text-ink-muted">Our hair experts are just a call away</p>
        <p className="mt-5 text-[1.7rem] font-bold tracking-tight text-crimson-700">{CLINIC.phoneDisplay || CLINIC.phone}</p>
        <a href={`tel:${CLINIC.phone}`} onClick={close} className="grad-crimson mt-5 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:brightness-110">
          <Phone size={17} aria-hidden /> Call Now
        </a>
        <button onClick={close} className="mt-4 text-sm font-semibold text-ink-muted transition hover:text-ink">Maybe later</button>
      </div>
    </div>
  );
}
