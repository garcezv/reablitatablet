import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import InfoBanner from '@/components/InfoBanner';
import { useI18n } from '@/lib/i18n';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function LoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/home', { replace: true });
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha e-mail e senha.');
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error('Credenciais inválidas. Verifique e-mail e senha.');
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <PageHeader title={t('login.page')} showLearnMore />
      <div className="flex-1 px-4 py-4 space-y-4">
        <h1 className="text-xl font-bold text-foreground">{t('login.title')}</h1>
        <p className="text-sm text-muted-foreground">{t('login.welcome')}</p>
        <InfoBanner text={t('login.lgpd')} />

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-sm text-foreground mb-1">{t('login.email')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="block text-sm text-foreground mb-1">{t('login.password')}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Acessando...' : t('login.submit')}
          </button>
          <button type="button" className="w-full border border-input py-3 rounded-md text-sm text-foreground">
            {t('login.forgot')}
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => navigate('/request-access')}
              className="w-full border border-primary py-3 rounded-md text-sm text-primary font-semibold"
            >
              {t('login.request')}
            </button>
          </div>
          <button type="button" className="w-full border border-input py-3 rounded-md text-sm text-foreground">
            {t('login.gov')}
          </button>
        </form>
      </div>
    </div>
  );
}
