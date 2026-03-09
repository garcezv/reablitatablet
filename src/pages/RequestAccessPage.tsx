import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import InfoBanner from '@/components/InfoBanner';
import { useI18n } from '@/lib/i18n';
import { useCep } from '@/hooks/use-cep';
import { Loader2 } from 'lucide-react';
import { isValidCPF, formatCPF } from '@/lib/cpf';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function RequestAccessPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { fetchCep, loading: cepLoading } = useCep();
  const [saving, setSaving] = useState(false);
  const [cpf, setCpf] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [form, setForm] = useState({
    fullName: '', birthDate: '', socialName: '',
    email: '', confirmEmail: '', personalPhone: '', institutionalPhone: '',
    accessType: '', professionalRegister: '', systemFunction: '',
    institutionType: '',
  });
  const [address, setAddress] = useState({ cep: '', state: '', city: '', neighborhood: '', street: '', number: '', complement: '' });

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleCepBlur = async (cepValue: string) => {
    const data = await fetchCep(cepValue);
    if (data) {
      setAddress(a => ({
        ...a,
        street: data.street || a.street,
        neighborhood: data.neighborhood || a.neighborhood,
        city: data.city || a.city,
        state: data.state || a.state,
        complement: data.complement || a.complement,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!form.fullName || !form.email || !cpf || !form.personalPhone) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!isValidCPF(cpf)) {
      setCpfError(t('register.invalidCpf'));
      return;
    }
    if (form.email !== form.confirmEmail) {
      toast.error('Os e-mails não conferem.');
      return;
    }

    setSaving(true);
    const { error } = await supabase.from('access_requests').insert({
      full_name: form.fullName,
      cpf,
      email: form.email,
      confirm_email: form.confirmEmail,
      personal_phone: form.personalPhone,
      institutional_phone: form.institutionalPhone || null,
      birth_date: form.birthDate || null,
      social_name: form.socialName || null,
      access_type: form.accessType || null,
      professional_register: form.professionalRegister || null,
      system_function: form.systemFunction || null,
      institution_type: form.institutionType || null,
      cep: address.cep || null,
      state: address.state || null,
      city: address.city || null,
      neighborhood: address.neighborhood || null,
      street: address.street || null,
      number: address.number || null,
      complement: address.complement || null,
    });
    setSaving(false);

    if (error) {
      toast.error(error.message || 'Erro ao enviar solicitação.');
    } else {
      toast.success('Solicitação enviada com sucesso!');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <PageHeader title={t('request.title')} showLearnMore />
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        <InfoBanner text={t('request.lgpd')} variant="warning" />

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('request.accessType')} <span className="text-primary">◆</span>
            </label>
            <select
              value={form.accessType}
              onChange={e => update('accessType', e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
            >
              <option value="">{t('request.selectAccessType')}</option>
              <option value="facilitator">Facilitador</option>
              <option value="researcher">Pesquisador</option>
            </select>
          </div>

          <h3 className="font-semibold text-foreground">{t('register.idSection')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.cpf')} <span className="text-primary">◆</span></label>
              <input
                placeholder="000.000.000-00"
                value={cpf}
                onChange={e => { setCpf(formatCPF(e.target.value)); if (cpfError) setCpfError(''); }}
                onBlur={() => { if (cpf && !isValidCPF(cpf)) setCpfError(t('register.invalidCpf')); else setCpfError(''); }}
                className={`w-full border rounded-md px-3 py-2 text-sm bg-background ${cpfError ? 'border-destructive' : 'border-input'}`}
              />
              {cpfError && <span className="text-xs text-destructive mt-0.5 block">{cpfError}</span>}
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.fullName')} <span className="text-primary">◆</span></label>
              <input
                placeholder="Insira seu nome completo"
                value={form.fullName}
                onChange={e => update('fullName', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.birthDate')} <span className="text-primary">◆</span></label>
              <input
                type="date"
                value={form.birthDate}
                onChange={e => update('birthDate', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.socialName')}</label>
              <input
                placeholder="Insira seu nome social caso possuir"
                value={form.socialName}
                onChange={e => update('socialName', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>

          <h3 className="font-semibold text-foreground">{t('register.contacts')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('login.email')} <span className="text-primary">◆</span></label>
              <input
                placeholder="exemplo@email.com"
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.confirmEmail')} <span className="text-primary">◆</span></label>
              <input
                type="email"
                value={form.confirmEmail}
                onChange={e => update('confirmEmail', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.personalPhone')} <span className="text-primary">◆</span></label>
              <input
                placeholder="(DDD)00000-0000"
                value={form.personalPhone}
                onChange={e => update('personalPhone', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.institutionalPhone')}</label>
              <input
                placeholder="(DDD)00000-0000"
                value={form.institutionalPhone}
                onChange={e => update('institutionalPhone', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>

          <h3 className="font-semibold text-foreground">{t('request.professionalData')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.professionalRegister')} <span className="text-primary">◆</span></label>
              <select
                value={form.professionalRegister}
                onChange={e => update('professionalRegister', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="">{t('request.selectRegister')}</option>
                <option value="CRFa">CRFa</option>
                <option value="CRM">CRM</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.systemFunction')} <span className="text-primary">◆</span></label>
              <input
                placeholder="Administrador, facilitador, pesquisador..."
                value={form.systemFunction}
                onChange={e => update('systemFunction', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>

          <h3 className="font-semibold text-foreground">{t('request.institutionalAddress')}</h3>
          <p className="text-xs text-muted-foreground">{t('request.institutionalAddressNote')}</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.cep')} <span className="text-primary">◆</span></label>
              <div className="relative">
                <input
                  placeholder="00000-000"
                  value={address.cep}
                  onChange={e => setAddress(a => ({ ...a, cep: e.target.value }))}
                  onBlur={e => handleCepBlur(e.target.value)}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
                />
                {cepLoading && <Loader2 className="absolute right-2 top-2.5 w-4 h-4 animate-spin text-muted-foreground" />}
              </div>
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.state')} <span className="text-primary">◆</span></label>
              <select
                value={address.state}
                onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="">{t('common.select')}</option>
                {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.city')} <span className="text-primary">◆</span></label>
              <input
                placeholder={t('common.search')}
                value={address.city}
                onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.neighborhood')} <span className="text-primary">◆</span></label>
              <input
                value={address.neighborhood}
                onChange={e => setAddress(a => ({ ...a, neighborhood: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.street')} <span className="text-primary">◆</span></label>
              <input
                value={address.street}
                onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.number')} <span className="text-primary">◆</span></label>
              <input
                value={address.number}
                onChange={e => setAddress(a => ({ ...a, number: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.type')} <span className="text-primary">◆</span></label>
              <input
                placeholder="UBS, Instituição de ensino..."
                value={form.institutionType}
                onChange={e => update('institutionType', e.target.value)}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.complement')}</label>
              <input
                value={address.complement}
                onChange={e => setAddress(a => ({ ...a, complement: e.target.value }))}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 pb-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2 border border-primary rounded-md text-sm text-primary">
              {t('request.cancel')}
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold disabled:opacity-50"
            >
              {saving ? 'Enviando...' : t('request.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
