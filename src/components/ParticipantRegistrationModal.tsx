import { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import InfoBanner from './InfoBanner';
import CancelWarningModal from './CancelWarningModal';
import { addParticipant } from '@/lib/data';
import { Upload } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ParticipantRegistrationModal({ onClose }: Props) {
  const { t } = useI18n();
  const [showCancel, setShowCancel] = useState(false);
  const [form, setForm] = useState({
    cpf: '', fullName: '', birthDate: '', socialName: '',
    rg: '', issuingBody: '', issueDate: '',
    bioSex: '', genderIdentity: '', race: '',
    motherName: '', fatherName: '',
    email: '', phone: '',
    cep: '', state: '', city: '', neighborhood: '', street: '', number: '', complement: '',
    institution: '', teacher: '', hearingComplaint: '', complaintDetails: '', observations: '',
  });

  const update = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = () => {
    addParticipant({
      ...form,
      testPerformed: 'Aud.IT',
      lastTestDate: new Date().toLocaleDateString('pt-BR'),
      hearingStatus: 'Normal',
      needsReevaluation: false,
    });
    onClose();
  };

  const Field = ({ label, k, placeholder, required, type, span }: { label: string; k: string; placeholder?: string; required?: boolean; type?: string; span?: number }) => (
    <div className={span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : ''}>
      <label className="block text-xs text-foreground mb-1">
        {label} {required && <span className="text-primary">◆</span>}
      </label>
      <input
        type={type || 'text'}
        placeholder={placeholder}
        value={(form as any)[k] || ''}
        onChange={e => update(k, e.target.value)}
        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  );

  const SelectField = ({ label, k, required, options }: { label: string; k: string; required?: boolean; options?: string[] }) => (
    <div>
      <label className="block text-xs text-foreground mb-1">
        {label} {required && <span className="text-primary">◆</span>}
      </label>
      <select
        value={(form as any)[k] || ''}
        onChange={e => update(k, e.target.value)}
        className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background"
      >
        <option value="">{t('common.select')}</option>
        {(options || []).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-foreground/30 z-50 flex items-center justify-center p-2">
      <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
        <h2 className="text-lg font-bold text-foreground">{t('register.title')}</h2>
        <InfoBanner text={t('register.lgpd')} variant="warning" />

        {/* Dados de identificação */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.idSection')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t('register.cpf')} k="cpf" placeholder="000.000.000-00" required />
          <Field label={t('register.fullName')} k="fullName" placeholder="Ex: José Maria da Silva" required />
          <Field label={t('register.birthDate')} k="birthDate" type="date" required />
          <Field label={t('register.socialName')} k="socialName" placeholder="Ex: José Maria da Silva" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Field label={t('register.rg')} k="rg" placeholder="000.000.000" required />
          <Field label={t('register.issuingBody')} k="issuingBody" placeholder="Ex: SSP/DF" required />
          <Field label={t('register.issueDate')} k="issueDate" type="date" required />
        </div>

        {/* Dados complementares */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.complementary')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label={t('register.bioSex')} k="bioSex" options={['Masculino', 'Feminino', 'Intersexo']} />
          <SelectField label={t('register.genderIdentity')} k="genderIdentity" options={['Cisgênero', 'Transgênero', 'Não-binário', 'Outro']} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <SelectField label={t('register.race')} k="race" options={['Branca', 'Preta', 'Parda', 'Amarela', 'Indígena']} />
          <Field label={t('register.motherName')} k="motherName" placeholder="Ex: Maria da Silva" required />
          <Field label={t('register.fatherName')} k="fatherName" placeholder="Ex: José da Silva" />
        </div>

        {/* Contatos */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.contacts')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t('register.personalEmail')} k="email" placeholder="nome@email.com" type="email" />
          <Field label={t('register.phone')} k="phone" placeholder="(DDD) 9000-0000" />
        </div>

        {/* Endereço */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.address')}</h3>
        <div className="grid grid-cols-3 gap-3">
          <Field label={t('register.cep')} k="cep" placeholder="00000-000" />
          <SelectField label={t('register.state')} k="state" options={['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']} />
          <Field label={t('register.city')} k="city" placeholder={t('common.search')} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label={t('register.neighborhood')} k="neighborhood" placeholder={t('common.search')} />
          <Field label={t('register.street')} k="street" placeholder="Ex: Rua dos Bobos" />
          <Field label={t('register.number')} k="number" placeholder="123" />
        </div>
        <Field label={t('register.complement')} k="complement" placeholder="Ex: Apt 00" />

        {/* Informações adicionais */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.additional')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <Field label={t('register.institution')} k="institution" required />
          <Field label={t('register.teacher')} k="teacher" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SelectField label={t('register.hearingComplaint')} k="hearingComplaint" required options={['Sim', 'Não']} />
          <div>
            <label className="block text-xs text-foreground mb-1">{t('register.complaintDetails')}</label>
            <input
              disabled={form.hearingComplaint !== 'Sim'}
              value={form.complaintDetails}
              onChange={e => update('complaintDetails', e.target.value)}
              className="w-full border border-input rounded-md px-3 py-2 text-sm bg-muted disabled:bg-muted"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-foreground mb-1">{t('register.observations')}</label>
          <textarea
            value={form.observations}
            onChange={e => update('observations', e.target.value)}
            className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background h-16 resize-none"
          />
        </div>

        {/* Documentos */}
        <h3 className="font-semibold text-foreground text-sm">{t('register.documents')}</h3>
        <p className="text-xs text-muted-foreground">{t('register.documentsNote')}</p>
        <div className="border-2 border-dashed border-primary rounded-md p-6 flex flex-col items-center text-primary cursor-pointer">
          <Upload className="w-5 h-5 mb-1" />
          <span className="text-sm">{t('register.addFile')}</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setShowCancel(true)}
            className="px-6 py-2 border border-primary rounded-md text-sm text-primary"
          >
            {t('register.cancel')}
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-semibold"
          >
            {t('register.submit')}
          </button>
        </div>
      </div>

      {showCancel && (
        <CancelWarningModal
          title={t('cancelRegister.title')}
          message="Tem certeza que deseja cancelar? essa ação não poderá ser desfeita."
          confirmLabel="Cancelar cadastro"
          onBack={() => setShowCancel(false)}
          onConfirm={onClose}
        />
      )}
    </div>
  );
}
