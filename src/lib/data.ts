export interface Participant {
  id: string;
  fullName: string;
  cpf: string;
  birthDate: string;
  socialName?: string;
  rg?: string;
  issuingBody?: string;
  issueDate?: string;
  bioSex?: string;
  genderIdentity?: string;
  race?: string;
  motherName: string;
  fatherName?: string;
  email?: string;
  phone?: string;
  cep?: string;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
  complement?: string;
  institution?: string;
  teacher?: string;
  hearingComplaint?: string;
  complaintDetails?: string;
  observations?: string;
  testPerformed: 'Aud.IT' | 'Ouvir Brasil';
  lastTestDate: string;
  hearingStatus: 'Normal' | 'Alterado';
  needsReevaluation: boolean;
}

const mockParticipants: Participant[] = Array.from({ length: 20 }, (_, i) => ({
  id: String(i + 1),
  fullName: 'Pedro Eduardo dos Santos',
  cpf: '000.000.000-00',
  birthDate: '01/01/2015',
  motherName: 'Maria dos Santos',
  testPerformed: i % 3 === 2 ? 'Ouvir Brasil' : 'Aud.IT',
  lastTestDate: '16/02/2025',
  hearingStatus: i === 5 ? 'Alterado' : 'Normal',
  needsReevaluation: i === 5,
  institution: 'Escola Municipal',
}));

let participants = [...mockParticipants];
let nextId = 21;

export function getParticipants() { return participants; }

export function addParticipant(p: Omit<Participant, 'id'>) {
  const newP = { ...p, id: String(nextId++) };
  participants = [newP, ...participants];
  return newP;
}

export function deleteParticipant(id: string) {
  participants = participants.filter(p => p.id !== id);
}
