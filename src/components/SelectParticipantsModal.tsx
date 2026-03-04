import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { getParticipants } from '@/lib/data';
import ConfirmParticipantsModal from './ConfirmParticipantsModal';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function SelectParticipantsModal({ onClose }: Props) {
  const { t } = useI18n();
  const participants = getParticipants().slice(0, 10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 bg-foreground/30 z-50 flex items-end justify-center">
      <div className="bg-background w-full max-w-lg rounded-t-2xl p-4 max-h-[80vh] overflow-y-auto space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">{t('panel.selectParticipants')}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-muted-foreground" /></button>
        </div>

        <div className="space-y-2">
          {participants.map(p => (
            <label key={p.id} className="flex items-center gap-3 border border-border rounded-md px-3 py-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.includes(p.id)}
                onChange={() => toggleSelect(p.id)}
                className="accent-primary"
              />
              <div>
                <span className="text-sm text-foreground">{p.fullName}</span>
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                  p.testPerformed === 'Aud.IT'
                    ? 'bg-badge-audit text-badge-audit-foreground'
                    : 'bg-badge-ouvir text-badge-ouvir-foreground'
                }`}>
                  {p.testPerformed}
                </span>
              </div>
            </label>
          ))}
        </div>

        <button
          onClick={() => selectedIds.length > 0 && setShowConfirm(true)}
          className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm"
        >
          {t('panel.startTest')}
        </button>
      </div>

      {showConfirm && (
        <ConfirmParticipantsModal
          selectedIds={selectedIds}
          onClose={() => { setShowConfirm(false); onClose(); }}
        />
      )}
    </div>
  );
}
