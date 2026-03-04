import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import OptionsSidebar from '@/components/OptionsSidebar';
import { useI18n } from '@/lib/i18n';
import { ChevronDown, ListChecks, HelpCircle, Eye } from 'lucide-react';
import { useState } from 'react';

export default function InstructionsPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const items = [
    { icon: <ListChecks className="w-5 h-5 text-muted-foreground" />, label: t('instructions.checklist') },
    { icon: <HelpCircle className="w-5 h-5 text-muted-foreground" />, label: t('instructions.faq') },
    { icon: <Eye className="w-5 h-5 text-muted-foreground" />, label: t('instructions.responsibilities') },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu onMenuClick={() => setShowSidebar(true)} />
      <PageHeader title={t('instructions.title')} showBack />
      <div className="flex-1 px-4 py-4 space-y-4">
        <h1 className="text-xl font-bold text-foreground">{t('instructions.heading')}</h1>
        <p className="text-sm text-muted-foreground">{t('instructions.subtitle')}</p>

        <div className="space-y-2">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between border border-border rounded-md px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
          ))}
        </div>
      </div>

      <OptionsSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}
