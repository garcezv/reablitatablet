import { supabase } from '@/integrations/supabase/client';

export interface ParticipantRow {
  id: string;
  full_name: string;
  cpf: string;
  birth_date: string;
  social_name: string | null;
  rg: string | null;
  issuing_body: string | null;
  issue_date: string | null;
  bio_sex: string | null;
  gender_identity: string | null;
  race: string | null;
  mother_name: string;
  father_name: string | null;
  email: string | null;
  phone: string | null;
  cep: string | null;
  state: string | null;
  city: string | null;
  neighborhood: string | null;
  street: string | null;
  number: string | null;
  complement: string | null;
  institution: string | null;
  teacher: string | null;
  hearing_complaint: string | null;
  complaint_details: string | null;
  observations: string | null;
  created_by: string;
}

export interface ParticipantWithTest extends ParticipantRow {
  testPerformed: string;
  lastTestDate: string;
  hearingStatus: string;
  needsReevaluation: boolean;
}

export async function fetchParticipants(): Promise<ParticipantWithTest[]> {
  const { data: participants, error } = await supabase
    .from('participants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  if (!participants) return [];

  // Fetch latest test result for each participant
  const { data: testResults } = await supabase
    .from('test_results')
    .select('*')
    .order('performed_at', { ascending: false });

  const testMap = new Map<string, { test_type: string; performed_at: string; hearing_status: string; needs_reevaluation: boolean }>();
  
  (testResults || []).forEach(tr => {
    if (!testMap.has(tr.participant_id)) {
      testMap.set(tr.participant_id, {
        test_type: tr.test_type === 'audit' ? 'Aud.IT' : 'Ouvir Brasil',
        performed_at: new Date(tr.performed_at).toLocaleDateString('pt-BR'),
        hearing_status: tr.hearing_status === 'normal' ? 'Normal' : 'Alterado',
        needs_reevaluation: tr.needs_reevaluation,
      });
    }
  });

  return participants.map(p => {
    const test = testMap.get(p.id);
    return {
      ...p,
      testPerformed: test?.test_type || 'Aud.IT',
      lastTestDate: test?.performed_at || '-',
      hearingStatus: test?.hearing_status || 'Normal',
      needsReevaluation: test?.needs_reevaluation || false,
    };
  });
}

export async function createParticipant(data: Omit<ParticipantRow, 'id'>): Promise<ParticipantRow> {
  const { data: result, error } = await supabase
    .from('participants')
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function deleteParticipant(id: string) {
  const { error } = await supabase.from('participants').delete().eq('id', id);
  if (error) throw error;
}
