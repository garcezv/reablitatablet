import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import ParticipantsTable from '@/components/ParticipantsTable';
import ParticipantRegistrationModal from '@/components/ParticipantRegistrationModal';
import OptionsSidebar from '@/components/OptionsSidebar';
import { useI18n } from '@/lib/i18n';

export default function ManageParticipantsPage() {
  const { t } = useI18n();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader showMenu onMenuClick={() => setShowSidebar(true)} />
      <PageHeader title={t('manage.title')} showBack showLearnMore />
      <div className="flex-1 px-4 py-4 space-y-4">
        <div className="border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-foreground">{t('manage.registered')}</h2>
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

          <ParticipantsTable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            showLinesPerPage
          />
        </div>
      </div>

      {showRegister && (
        <ParticipantRegistrationModal onClose={() => setShowRegister(false)} />
      )}

      <OptionsSidebar open={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}
