import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import OptionsSidebar from '@/components/OptionsSidebar';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect, useRef } from 'react';

export default function NoiseCheckPage() {
  const { t } = useI18n();
  const [db, setDb] = useState(27.5);
  const [testing, setTesting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleTest = () => {
    setTesting(true);
    intervalRef.current = setInterval(() => {
      setDb(Math.round((Math.random() * 50 + 10) * 10) / 10);
    }, 200);
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      setDb(Math.round((Math.random() * 35 + 15) * 10) / 10);
      setTesting(false);
    }, 3000);
  };

  // Gauge: 0–60 dB mapped to 180° arc (left to right)
  const clampedDb = Math.min(60, Math.max(0, db));
  const needleAngle = -180 + (clampedDb / 60) * 180;

  // Arc segments: green 0-20, yellow 20-40, red 40-60
  const cx = 150, cy = 140, r = 100;
  const arcStart = -180;

  const polarToCart = (angleDeg: number) => ({
    x: cx + r * Math.cos((angleDeg * Math.PI) / 180),
    y: cy + r * Math.sin((angleDeg * Math.PI) / 180),
  });

  const describeArc = (startAngle: number, endAngle: number) => {
    const s = polarToCart(startAngle);
    const e = polarToCart(endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const needleEnd = polarToCart(needleAngle);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu onMenuClick={() => setShowSidebar(true)} />
      <PageHeader title={t('noise.title')} showBack />
      <div className="flex-1 px-4 py-4 space-y-2">
        <h1 className="text-xl font-bold text-foreground">{t('noise.heading')}</h1>
        <p className="text-sm text-muted-foreground">{t('noise.subtitle')}</p>

        <div className="flex flex-col items-center pt-8 pb-4">
          <div className="w-64 h-36">
            <svg viewBox="0 0 300 155" className="w-full h-full">
              {/* Green arc: 0-20 dB → -180° to -120° */}
              <path d={describeArc(-180, -120)} fill="none" stroke="hsl(var(--success-foreground))" strokeWidth="28" strokeLinecap="butt" />
              {/* Yellow arc: 20-40 dB → -120° to -60° */}
              <path d={describeArc(-120, -60)} fill="none" stroke="hsl(45, 90%, 55%)" strokeWidth="28" strokeLinecap="butt" />
              {/* Red arc: 40-60 dB → -60° to 0° */}
              <path d={describeArc(-60, 0)} fill="none" stroke="hsl(var(--destructive))" strokeWidth="28" strokeLinecap="butt" />

              {/* Needle */}
              <line
                x1={cx} y1={cy}
                x2={needleEnd.x} y2={needleEnd.y}
                stroke="hsl(var(--foreground))"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ transition: testing ? 'none' : 'all 0.4s ease-out' }}
              />
              {/* Center dot */}
              <circle cx={cx} cy={cy} r="8" fill="hsl(var(--foreground))" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-foreground mt-2">{db.toFixed(1)} dB</span>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleTest}
            disabled={testing}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md text-sm font-semibold disabled:opacity-50"
          >
            {t('noise.test')}
          </button>
        </div>
      </div>

      <OptionsSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}
