import { useI18n } from '@/lib/i18n';

interface Props {
  title: string;
  message: string;
  onBack: () => void;
  onConfirm: () => void;
}

export default function CancelWarningModal({ title, message, onBack, onConfirm }: Props) {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 bg-foreground/30 z-[70] flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 border border-primary text-primary py-2 rounded-md text-sm"
          >
            {t('cancel.back')}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-destructive text-destructive-foreground py-2 rounded-md text-sm font-semibold"
          >
            {t('cancel.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
