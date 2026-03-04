import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { getParticipants } from '@/lib/data';
import CancelWarningModal from './CancelWarningModal';
import { GripHorizontal, Trash2 } from 'lucide-react';

interface Props {
  selectedIds: string[];
  onClose: () => void;
}

export default function ConfirmParticipantsModal({ selectedIds, onClose }: Props) {
  const { t } = useI18n();
  const [showCancel, setShowCancel] = useState(false);
  const [ids, setIds] = useState(selectedIds);
  const participants = getParticipants().filter(p => ids.includes(p.id));

  const removeParticipant = (id: string) => {
    setIds(prev => prev.filter(i => i !== id));
  };

  return (
    <div className="fixed inset-0 bg-foreground/30 z-[60] flex items-end sm:items-center justify-center">
      <div className="bg-background rounded-t-2xl sm:rounded-lg p-6 w-full max-w-lg space-y-4">
        <h2 className="text-lg font-bold text-foreground">{t('confirm.title')}</h2>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
            {t('panel.name')}
          </div>
          <div className="divide-y divide-border max-h-60 overflow-y-auto">
            {participants.map(p => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <GripHorizontal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{p.fullName}</span>
                </div>
                <button onClick={() => removeParticipant(p.id)} className="text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm"
        >
          {t('confirm.start')}
        </button>
        <button
          onClick={() => setShowCancel(true)}
          className="w-full border border-border py-3 rounded-md text-sm text-foreground"
        >
          {t('confirm.cancel')}
        </button>
      </div>

      {showCancel && (
        <CancelWarningModal
          title={t('cancel.title')}
          message="Tem certeza que deseja cancelar o teste? Essa ação não poderá ser desfeita."
          confirmLabel={t('cancel.title')}
          onBack={() => setShowCancel(false)}
          onConfirm={onClose}
        />
      )}
    </div>
  );
}
