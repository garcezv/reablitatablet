import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  showLearnMore?: boolean;
}

export default function PageHeader({ title, showBack = false, showLearnMore = false }: PageHeaderProps) {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="page-header flex items-center justify-between">
      <div className="flex items-center gap-2">
        {showBack && (
          <button onClick={() => navigate(-1)} className="text-primary">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <span>{title}</span>
      </div>
      {showLearnMore && (
        <button className="text-xs text-primary border border-primary rounded px-2 py-0.5">
          {t('login.learnMore')}
        </button>
      )}
    </div>
  );
}
