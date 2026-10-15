import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Picks up any images placed in src/assets/images/gallery/. Renders nothing while the folder is empty.
const files = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

/** Snap carousel: one card per step, previous/next + dots, auto-advances every 3 seconds. */
export default function Gallery() {
  const items = Object.entries(files).sort(([a], [b]) => a.localeCompare(b)).map(([path, url]) => ({
    url,
    alt: path.split('/').pop().replace(/\.[^.]+$/, '').replace(/^result-\d+-/, '').replace(/[-_]+/g, ' '),
  }));
  const track = useRef(null);
  const paused = useRef(false);
  const [index, setIndex] = useState(0);
  const [positions, setPositions] = useState(items.length);

  // Geometry: card step (px) and how many card positions can be reached.
  const measure = useCallback(() => {
    const el = track.current;
    if (!el || el.children.length < 1) return null;
    const first = el.children[0];
    const step = el.children[1] ? el.children[1].offsetLeft - first.offsetLeft : first.offsetWidth;
    const max = el.scrollWidth - el.clientWidth;
    const visible = Math.max(1, Math.round((el.clientWidth - first.offsetLeft) / step));
    return { step, max, positions: Math.max(1, el.children.length - visible + 1) };
  }, []);

  const goTo = useCallback((n) => {
    const el = track.current;
    const m = measure();
    if (!el || !m) return;
    const i = ((n % m.positions) + m.positions) % m.positions; // wraps both ways
    el.scrollTo({ left: Math.min(i * m.step, m.max), behavior: 'smooth' });
    setIndex(i);
  }, [measure]);

  // Keep the active dot in step with manual swipes/drags.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const sync = () => {
      const m = measure();
      if (!m) return;
      setPositions(m.positions);
      setIndex(Math.min(m.positions - 1, Math.round(el.scrollLeft / m.step)));
    };
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => { el.removeEventListener('scroll', sync); window.removeEventListener('resize', sync); };
  }, [measure, items.length]);

  // Auto-advance every 3 seconds; loops; pauses while hovered/touched/focused or with reduced motion.
  const indexRef = useRef(0);
  indexRef.current = index;
  useEffect(() => {
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!paused.current) goTo(indexRef.current + 1); }, 3000);
    return () => clearInterval(id);
  }, [goTo, items.length]);

  if (!items.length) return null;
  const hold = (v) => () => { paused.current = v; };
  const arrow = 'grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-ink';

  return (
    <section id="gallery" className="overflow-hidden bg-ink py-16 text-white sm:py-24">
      <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-4 xs:px-5 2xl:max-w-7xl">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-blush-300">Gallery</p>
          <h2 className="mt-3 text-3xl font-medium leading-tight sm:text-4xl">Treatment Results</h2>
          <p className="mt-2 text-sm text-white/60">Individual results vary from person to person.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => goTo(index - 1)} aria-label="Previous result" className={arrow}><ArrowLeft size={20} aria-hidden /></button>
          <button onClick={() => goTo(index + 1)} aria-label="Next result" className={arrow}><ArrowRight size={20} aria-hidden /></button>
        </div>
      </div>

      <ul ref={track} onMouseEnter={hold(true)} onMouseLeave={hold(false)} onTouchStart={hold(true)} onTouchEnd={() => setTimeout(hold(false), 4000)} onFocus={hold(true)} onBlur={hold(false)}
        className="relative mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 xs:scroll-px-5 xs:gap-5 xs:px-5 2xl:max-w-7xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, n) => (
          <li key={it.url} className="w-[84%] shrink-0 snap-start xs:w-[70%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.85rem)]">
            <figure className="rounded-3xl border border-white/10 bg-white/[0.04] p-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-black">
                <img src={it.url} alt="" aria-hidden loading="lazy" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl" />
                <img src={it.url} alt={it.alt} loading="lazy" decoding="async" className="relative h-full w-full object-contain" />
              </div>
              <figcaption className="flex items-center justify-between px-2 pb-1 pt-4">
                <span className="text-sm font-medium capitalize">{it.alt}</span>
                <span className="text-sm text-white/50">{String(n + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Result slides">
        {Array.from({ length: positions }, (_, n) => (
          <button key={n} role="tab" aria-selected={n === index} aria-label={`Go to result ${n + 1}`} onClick={() => goTo(n)}
            className={`h-2 rounded-full transition-all duration-300 ${n === index ? 'grad-crimson w-8' : 'w-2 bg-white/30 hover:bg-white/60'}`} />
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-white/10 px-4 pt-14 xs:px-5 2xl:max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h3 className="text-[1.7rem] font-medium leading-[1.2] xs:text-3xl sm:text-4xl">Take the Next Step Towards Hair Restoration</h3>
            <p className="mt-4 leading-relaxed text-white/70">Concerned about hair fall, thinning hair or bald patches? Speak with our team to explore the available hair treatment options.</p>
          </div>
          <a href="#book" className="grad-crimson inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 font-medium text-white shadow-glow transition hover:brightness-110">Book a Consultation <ArrowRight size={18} aria-hidden /></a>
        </div>
      </div>
    </section>
  );
}
