import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import LeadForm from './LeadForm.jsx';

/** Lead-form modal shown 3 seconds after every page load. Calls onClose when dismissed. */
export default function FormPopup({ onClose }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const close = () => { setOpen(false); onClose?.(); };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={close} className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/60 p-5 [animation:sheet_.25s_ease-out_both]">
      <div role="dialog" aria-modal="true" aria-labelledby="popup-title" onClick={(e) => e.stopPropagation()}
        className="sheet relative my-auto w-full max-w-md rounded-3xl bg-cream p-6 text-ink shadow-soft xs:p-8">
        <span className="grad-crimson absolute inset-x-10 top-0 h-1 rounded-b-full" aria-hidden />
        <button onClick={close} aria-label="Close form" className="absolute right-3 top-4 rounded-full p-1.5 text-ink/60 transition hover:bg-ink/10">
          <X size={20} aria-hidden />
        </button>
        <h2 id="popup-title" className="pr-8 text-2xl font-medium">Book Your Hair Consultation</h2>
        <p className="mb-6 mt-2 text-ink-body">Share your details to enquire about suitable hair treatment options.</p>
        <LeadForm id="popup" variant="date" submitLabel="Book my consultation" />
      </div>
    </div>
  );
}
