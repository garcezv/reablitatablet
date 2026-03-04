import { Info } from 'lucide-react';

interface InfoBannerProps {
  text: string;
  variant?: 'info' | 'warning';
}

export default function InfoBanner({ text, variant = 'info' }: InfoBannerProps) {
  return (
    <div className={`rounded-md p-3 text-sm flex items-start gap-2 ${
      variant === 'warning'
        ? 'bg-warning text-warning-foreground'
        : 'bg-info text-info-foreground'
    }`}>
      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}
