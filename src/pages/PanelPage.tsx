import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import InfoBanner from '@/components/InfoBanner';
import ParticipantsTable from '@/components/ParticipantsTable';
import ParticipantRegistrationModal from '@/components/ParticipantRegistrationModal';
import ConfirmParticipantsModal from '@/components/ConfirmParticipantsModal';
import { useI18n } from '@/lib/i18n';

export default function PanelPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu />
      <PageHeader title={t('panel.title')} showBack showLearnMore />

      <div className="px-4 py-4 space-y-4 flex-1">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-info flex items-center justify-center">
            <span className="text-3xl">🧒</span>
          </div>
        </div>

        {/* Step buttons */}
        <div className="flex gap-2">
          <button onClick={() => navigate('/instructions')} className="flex-1 py-2 border border-primary rounded-md text-sm text-primary font-medium">
            {t('panel.instructions')}
          </button>
          <button onClick={() => navigate('/noise-check')} className="flex-1 py-2 border border-primary rounded-md text-sm text-primary font-medium">
            {t('panel.checkNoise')}
          </button>
          <button disabled className="flex-1 py-2 border border-border rounded-md text-sm text-muted-foreground">
            {t('panel.protocol')}
          </button>
          <button disabled className="flex-1 py-2 border border-border rounded-md text-sm text-muted-foreground">
            {t('panel.calibration')}
          </button>
        </div>

        {/* Participants section */}
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{t('panel.selectParticipants')}</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowRegister(true)}
                className="text-xs text-primary border border-primary rounded-md px-3 py-1.5 flex items-center gap-1"
              >
                🔍 {t('panel.registerParticipant')}
              </button>
              <input
                placeholder={t('panel.searchParticipant')}
                className="border border-input rounded-md px-3 py-1.5 text-xs w-40"
              />
            </div>
          </div>

          <InfoBanner text={t('panel.infoText')} />

          <ParticipantsTable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        </div>

        {/* Start test button */}
        <button
          onClick={() => selectedIds.length > 0 && setShowConfirm(true)}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm"
        >
          {t('panel.startTest')}
        </button>
      </div>

      {showRegister && (
        <ParticipantRegistrationModal onClose={() => setShowRegister(false)} />
      )}
      {showConfirm && (
        <ConfirmParticipantsModal
          selectedIds={selectedIds}
          onClose={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
