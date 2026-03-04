import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import { useI18n } from '@/lib/i18n';
import SelectParticipantsModal from '@/components/SelectParticipantsModal';
import OptionsSidebar from '@/components/OptionsSidebar';
import logoOuvirBrasil from '@/assets/logo-ouvir-brasil.png';
import logoAudit from '@/assets/logo-audit.png';

export default function HomePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu onMenuClick={() => setShowSidebar(true)} />
      <PageHeader title={t('home.page')} showLearnMore />
      <div className="flex-1 px-4 py-4 space-y-4">
        <h1 className="text-2xl font-bold text-foreground">{t('home.welcome')}</h1>
        <p className="text-sm text-muted-foreground">{t('home.subtitle')}</p>

        <div className="grid grid-cols-2 gap-4">
          {/* Ouvir Brasil card */}
          <div className="border border-border rounded-lg p-4 relative">
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">+18</div>
            <div className="flex flex-col items-center mb-3">
              <img src={logoOuvirBrasil} alt="Ouvir Brasil" className="w-20 h-20 object-contain mb-2" />
              <span className="text-sm font-medium text-foreground">Ouvir Brasil</span>
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{t('home.triageRapid')}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t('home.triageRapidDesc')}</p>
            <div className="flex gap-2">
              <button className="flex-1 text-xs border border-border rounded-md py-1.5 text-foreground">{t('home.panelOuvir')}</button>
              <button className="flex-1 text-xs bg-primary text-primary-foreground rounded-md py-1.5">{t('home.startTest')}</button>
            </div>
          </div>

          {/* aud.IT card */}
          <div className="border border-border rounded-lg p-4 relative">
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5">+4</div>
            <div className="flex flex-col items-center mb-3">
              <img src={logoAudit} alt="aud.IT" className="w-20 h-20 object-contain mb-2" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{t('home.triagePediatric')}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t('home.triagePediatricDesc')}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/panel')}
                className="flex-1 text-xs border border-primary rounded-md py-1.5 text-primary"
              >
                {t('home.panelAudit')}
              </button>
              <button
                onClick={() => setShowSelectModal(true)}
                className="flex-1 text-xs bg-primary text-primary-foreground rounded-md py-1.5"
              >
                {t('home.startTest')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSelectModal && (
        <SelectParticipantsModal onClose={() => setShowSelectModal(false)} />
      )}

      <OptionsSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}
