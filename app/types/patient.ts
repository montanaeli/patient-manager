export interface Patient {
  id: string;
  createdAt: string;
  name: string;
  avatar: string;
  description: string;
  website: string;
}

export interface PatientFormData extends Omit<Patient, 'id' | 'createdAt'> {
  id?: string;
  createdAt?: string;
}