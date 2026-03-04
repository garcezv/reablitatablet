import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import PageHeader from '@/components/PageHeader';
import InfoBanner from '@/components/InfoBanner';
import { useI18n } from '@/lib/i18n';
import { useCep } from '@/hooks/use-cep';
import { Loader2 } from 'lucide-react';
export default function RequestAccessPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <PageHeader title={t('request.title')} showLearnMore />
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
        <InfoBanner text={t('request.lgpd')} variant="warning" />

        <div className="space-y-4">
          {/* Tipo de acesso */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              {t('request.accessType')} <span className="text-primary">◆</span>
            </label>
            <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
              <option>{t('request.selectAccessType')}</option>
            </select>
          </div>

          {/* Dados de identificação */}
          <h3 className="font-semibold text-foreground">{t('register.idSection')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.cpf')} <span className="text-primary">◆</span></label>
              <input placeholder="000.000.000-00" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.fullName')} <span className="text-primary">◆</span></label>
              <input placeholder="Insira seu nome completo" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.birthDate')} <span className="text-primary">◆</span></label>
              <input placeholder="00/00/0000" type="date" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.socialName')}</label>
              <input placeholder="Insira seu nome social caso possuir" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>

          {/* Contatos */}
          <h3 className="font-semibold text-foreground">{t('register.contacts')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('login.email')} <span className="text-primary">◆</span></label>
              <input placeholder="exemplo@email.com" type="email" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.confirmEmail')} <span className="text-primary">◆</span></label>
              <input type="email" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.personalPhone')} <span className="text-primary">◆</span></label>
              <input placeholder="(DDD)00000-0000" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.institutionalPhone')}</label>
              <input placeholder="(DDD)00000-0000" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>

          {/* Dados profissionais */}
          <h3 className="font-semibold text-foreground">{t('request.professionalData')}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.professionalRegister')} <span className="text-primary">◆</span></label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                <option>{t('request.selectRegister')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.systemFunction')} <span className="text-primary">◆</span></label>
              <input placeholder="Administrador, facilitador, pesquisador..." className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>

          {/* Endereço institucional */}
          <h3 className="font-semibold text-foreground">{t('request.institutionalAddress')}</h3>
          <p className="text-xs text-muted-foreground">{t('request.institutionalAddressNote')}</p>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.cep')} <span className="text-primary">◆</span></label>
              <input placeholder="00000-000" className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.state')} <span className="text-primary">◆</span></label>
              <select className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background">
                <option>{t('common.select')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.city')} <span className="text-primary">◆</span></label>
              <input placeholder={t('common.search')} className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.neighborhood')} <span className="text-primary">◆</span></label>
              <input className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.street')} <span className="text-primary">◆</span></label>
              <input className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.number')} <span className="text-primary">◆</span></label>
              <input className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-foreground mb-1">{t('request.type')} <span className="text-primary">◆</span></label>
              <input placeholder="UBS, Instituição de ensino..." className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
            <div>
              <label className="block text-xs text-foreground mb-1">{t('register.complement')}</label>
              <input className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 pb-8">
            <button onClick={() => navigate(-1)} className="px-6 py-2 border border-primary rounded-md text-sm text-primary">
              {t('request.cancel')}
            </button>
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold">
              {t('request.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
