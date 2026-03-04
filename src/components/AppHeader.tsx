import { Globe, Menu } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';
import { useState } from 'react';

interface AppHeaderProps {
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export default function AppHeader({ showMenu = false, onMenuClick }: AppHeaderProps) {
  const { locale, setLocale } = useI18n();
  const [showLang, setShowLang] = useState(false);

  const langs: { code: Locale; label: string }[] = [
    { code: 'pt', label: 'PT-BR' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
      <div className="flex items-center gap-1">
        <span className="text-xs text-muted-foreground font-semibold tracking-wide">REDE</span>
        <span className="text-lg font-bold text-foreground">reab</span>
        <span className="text-lg text-muted-foreground">•</span>
        <span className="text-lg font-bold text-foreground">LITA</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setShowLang(!showLang)}
            className="flex items-center gap-1 px-2 py-1 rounded border border-border text-sm text-primary"
          >
            <Globe className="w-4 h-4" />
            {langs.find(l => l.code === locale)?.label}
          </button>
          {showLang && (
            <div className="absolute right-0 top-full mt-1 bg-card border border-border rounded shadow-lg z-50">
              {langs.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLocale(l.code); setShowLang(false); }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted ${locale === l.code ? 'text-primary font-semibold' : 'text-foreground'}`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {showMenu && (
          <button onClick={onMenuClick} className="p-1 rounded bg-primary text-primary-foreground">
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}
