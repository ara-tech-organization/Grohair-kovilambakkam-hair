/** Decorative flowing hair-strand lines, drawn once on load. */
export default function Strands({ className = '' }) {
  const paths = [
    'M-20 620 C 180 520, 260 300, 420 220 S 700 120, 840 -20',
    'M-20 660 C 220 580, 320 380, 480 300 S 760 200, 900 40',
    'M-20 700 C 260 640, 380 460, 540 380 S 820 290, 960 120',
    'M40 740 C 300 700, 440 540, 600 460 S 880 380, 1000 220',
    'M120 780 C 380 750, 500 620, 660 540 S 930 470, 1040 320',
  ];
  return (
    <svg viewBox="0 0 900 700" fill="none" aria-hidden="true" className={className} preserveAspectRatio="xMaxYMid slice">
      {paths.map((d, i) => (
        <path key={i} d={d} className="strand" style={{ animationDelay: `${i * 0.25}s` }}
          stroke={i % 2 ? "#F7A3A6" : "#ED2229"} strokeWidth={i === 2 ? 3 : 1.5} strokeLinecap="round" opacity={0.9 - i * 0.13} />
      ))}
    </svg>
  );
}
