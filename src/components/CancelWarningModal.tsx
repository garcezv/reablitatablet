import { useI18n } from '@/lib/i18n';

interface Props {
  title: string;
  message: string;
  confirmLabel?: string;
  onBack: () => void;
  onConfirm: () => void;
}

export default function CancelWarningModal({ title, message, confirmLabel, onBack, onConfirm }: Props) {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 bg-foreground/30 z-[70] flex items-center justify-center p-4">
      <div className="rounded-xl p-6 w-full max-w-sm space-y-4" style={{ backgroundColor: 'hsl(45, 60%, 93%)' }}>
        <h2 className="text-lg font-bold" style={{ color: 'hsl(30, 30%, 25%)' }}>{title}</h2>
        <p className="text-sm" style={{ color: 'hsl(30, 20%, 35%)' }}>{message}</p>
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            onClick={onBack}
            className="text-sm font-medium"
            style={{ color: 'hsl(40, 30%, 40%)' }}
          >
            {t('cancel.back')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: 'hsl(42, 95%, 55%)', color: 'hsl(30, 30%, 20%)' }}
          >
            {confirmLabel || title}
          </button>
        </div>
      </div>
    </div>
  );
}
