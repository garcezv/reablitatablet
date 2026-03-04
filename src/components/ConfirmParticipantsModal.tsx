import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { getParticipants } from '@/lib/data';
import CancelWarningModal from './CancelWarningModal';

interface Props {
  selectedIds: string[];
  onClose: () => void;
}

export default function ConfirmParticipantsModal({ selectedIds, onClose }: Props) {
  const { t } = useI18n();
  const [showCancel, setShowCancel] = useState(false);
  const participants = getParticipants().filter(p => selectedIds.includes(p.id));

  return (
    <div className="fixed inset-0 bg-foreground/30 z-[60] flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold text-foreground">{t('confirm.title')}</h2>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {participants.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3 border border-border rounded-md px-3 py-2 text-sm text-foreground">
              <span className="font-semibold text-primary">{i + 1}.</span>
              <span>{p.fullName}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowCancel(true)}
            className="flex-1 border border-primary text-primary py-2 rounded-md text-sm"
          >
            {t('confirm.cancel')}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded-md text-sm font-semibold"
          >
            {t('confirm.start')}
          </button>
        </div>
      </div>

      {showCancel && (
        <CancelWarningModal
          title={t('cancel.title')}
          message={t('cancel.message')}
          onBack={() => setShowCancel(false)}
          onConfirm={onClose}
        />
      )}
    </div>
  );
}
