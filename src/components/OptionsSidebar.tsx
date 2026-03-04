import { X, UserPen, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';

interface OptionsSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function OptionsSidebar({ open, onClose }: OptionsSidebarProps) {
  const { t } = useI18n();
  const navigate = useNavigate();

  if (!open) return null;

  const handleNav = (path: string) => {
    onClose();
    navigate(path);
  };

  const linkClass = "block py-3 text-sm text-primary border-b border-border";
  const disabledClass = "block py-3 text-sm text-muted-foreground border-b border-border cursor-default";

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-72 bg-background z-50 shadow-xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-2">
          <h2 className="text-lg font-semibold text-foreground">{t('sidebar.title')}</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
            FT
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Fulana de Ta</p>
            <p className="text-xs text-muted-foreground">{t('sidebar.role')}</p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex-1 px-5 overflow-y-auto">
          <button onClick={() => handleNav('/instructions')} className={linkClass}>
            {t('sidebar.instructions')}
          </button>
          <button onClick={() => handleNav('/noise-check')} className={linkClass}>
            {t('sidebar.noiseCheck')}
          </button>
          <span className={disabledClass}>{t('sidebar.protocol')}</span>
          <span className={disabledClass}>{t('sidebar.calibration')}</span>
          <button onClick={() => handleNav('/manage-participants')} className={linkClass}>
            {t('sidebar.manageParticipants')}
          </button>
          <button className={linkClass}>
            {t('sidebar.manageFacilitators')}
          </button>
        </div>

        {/* Footer actions */}
        <div className="px-5 pb-6 border-t border-border pt-3 space-y-1">
          <button className="flex items-center gap-3 py-2.5 text-sm text-primary w-full">
            <UserPen className="w-5 h-5" />
            {t('sidebar.editProfile')}
          </button>
          <button
            onClick={() => { onClose(); navigate('/'); }}
            className="flex items-center gap-3 py-2.5 text-sm text-foreground w-full"
          >
            <LogOut className="w-5 h-5" />
            {t('sidebar.logout')}
          </button>
        </div>
      </div>
    </>
  );
}
