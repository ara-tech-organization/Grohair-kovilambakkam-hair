import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { CLINIC } from '../config.js';

const KEY = 'callPopupDismissed';

/** Shows once per browser session. No time-based or offer text. Hidden until a verified phone number is configured. */
export default function CallPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CLINIC.phone || sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => setOpen(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const close = () => { sessionStorage.setItem(KEY, '1'); setOpen(false); };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div role="dialog" aria-labelledby="call-title" className="sheet fixed inset-x-3 bottom-3 z-50 overflow-hidden rounded-3xl border border-white/10 bg-ink p-6 text-white shadow-soft sm:left-auto sm:right-5 sm:w-80">
      <span className="grad-crimson absolute inset-x-0 top-0 h-1" aria-hidden />
      <button onClick={close} aria-label="Close call prompt" className="absolute right-3 top-4 rounded-full p-1.5 text-blush-200 transition hover:bg-white/10">
        <X size={18} aria-hidden />
      </button>
      <p id="call-title" className="pr-8 font-display text-xl font-medium">Prefer to speak with us?</p>
      <p className="mt-1 text-sm text-blush-200">Call the Kovilambakkam clinic to discuss your hair concern.</p>
      <a href={`tel:${CLINIC.phone}`} onClick={close} className="grad-crimson mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-3 font-medium text-white shadow-glow transition hover:brightness-110">
        <Phone size={18} aria-hidden /> Call {CLINIC.phoneDisplay || 'the clinic'}
      </a>
    </div>
  );
}
