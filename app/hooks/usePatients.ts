import { useState, useEffect } from 'react';
import { Patient, PatientFormData } from '../types/patient';

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
      const data = await response.json();
      setPatients(data);
      return { success: true };
    } catch (err) {
      setError('Failed to fetch patients');
      return { success: false, error: 'Failed to fetch patients' };
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (patientData: PatientFormData) => {
    try {
      const newPatient: Patient = {
        ...patientData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      setPatients([...patients, newPatient]);
      return { success: true, message: 'Patient added successfully' };
    } catch (err) {
      return { success: false, error: 'Failed to add patient' };
    }
  };

  const updatePatient = async (id: string, patientData: PatientFormData) => {
    try {
      setPatients(
        patients.map((patient) =>
          patient.id === id
            ? { ...patient, ...patientData }
            : patient
        )
      );
      return { success: true, message: 'Patient updated successfully' };
    } catch (err) {
      return { success: false, error: 'Failed to update patient' };
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return { patients, loading, error, addPatient, updatePatient, fetchPatients };
};

export default usePatients;