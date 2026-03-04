import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import OptionsSidebar from '@/components/OptionsSidebar';
import { useI18n } from '@/lib/i18n';
import { useState } from 'react';

export default function NoiseCheckPage() {
  const { t } = useI18n();
  const [db, setDb] = useState(27.5);
  const [testing, setTesting] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleTest = () => {
    setTesting(true);
    const interval = setInterval(() => {
      setDb(Math.round((Math.random() * 50 + 10) * 10) / 10);
    }, 200);
    setTimeout(() => {
      clearInterval(interval);
      setDb(Math.round((Math.random() * 35 + 15) * 10) / 10);
      setTesting(false);
    }, 3000);
  };

  const angle = -90 + (db / 60) * 180;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu onMenuClick={() => setShowSidebar(true)} />
      <PageHeader title={t('noise.title')} showBack />
      <div className="flex-1 px-4 py-4 space-y-4">
        <h1 className="text-xl font-bold text-foreground">{t('noise.heading')}</h1>
        <p className="text-sm text-muted-foreground">{t('noise.subtitle')}</p>

        <div className="flex flex-col items-center py-8">
          <div className="relative w-56 h-28">
            <svg viewBox="0 0 200 110" className="w-full h-full">
              <path d="M 20 100 A 80 80 0 0 1 66 30" fill="none" stroke="hsl(142, 60%, 40%)" strokeWidth="20" strokeLinecap="butt" />
              <path d="M 66 30 A 80 80 0 0 1 134 30" fill="none" stroke="hsl(45, 90%, 55%)" strokeWidth="20" strokeLinecap="butt" />
              <path d="M 134 30 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(0, 70%, 50%)" strokeWidth="20" strokeLinecap="butt" />
              <line
                x1="100" y1="100"
                x2={100 + 65 * Math.cos((angle * Math.PI) / 180)}
                y2={100 + 65 * Math.sin((angle * Math.PI) / 180)}
                stroke="hsl(0, 0%, 15%)" strokeWidth="3" strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="6" fill="hsl(0, 0%, 25%)" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-foreground mt-4">{db.toFixed(1)} dB</span>
        </div>

        <div className="flex justify-center">
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
