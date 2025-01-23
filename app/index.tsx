import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import PatientCard from './components/PatientCard';
import PatientForm from './components/PatientForm';
import SearchBar from './components/SearchBar';
import Toast from './components/Toast';
import usePatients from './hooks/usePatients';
import useNotifications from './hooks/useNotifications';
import { Patient } from './types/patient';

export default function Index() {
  const { patients, loading, error, addPatient, updatePatient, fetchPatients } = usePatients();
  const { toast, showToast, hideToast } = useNotifications();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
    setModalVisible(true);
  };

  const handleSubmit = async (formData: any) => {
    if (selectedPatient) {
      const result = await updatePatient(selectedPatient.id, formData);
      if (result.success) {
        showToast(result.message || 'Operation successful', 'success');
      } else {
        showToast(result.error || 'An error occurred', 'error');
      }
    } else {
      const result = await addPatient(formData);
      if (result.success) {
        showToast(result.message || 'Operation successful', 'success');
      } else {
        showToast(result.error || 'An error occurred', 'error');
      }
    }
    setModalVisible(false);
    setSelectedPatient(undefined);
  };

  const handleSearch = (text: string ) => {
    setSearchQuery(text);
  };

  const getFilteredPatients = () => {
    if (!searchQuery.trim()) {
      return patients; 
    }
    
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getUniquePatients = (patients: Patient[]) => {
    const uniquePatients = new Map();
    
    patients.forEach(patient => {
      if (!uniquePatients.has(patient.name)) {
        uniquePatients.set(patient.name, patient);
      }
    });
    
    return Array.from(uniquePatients.values());
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            showToast('Retrying...', 'info');
            fetchPatients();
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />

      <SearchBar 
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setSelectedPatient(undefined);
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add New Patient</Text>
      </TouchableOpacity>

      <FlatList
        data={getUniquePatients(getFilteredPatients())}
        renderItem={({ item }) => (
          <PatientCard
            patient={item}
            onEdit={handleEdit}
          />
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
      />

      <PatientForm
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPatient(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={selectedPatient}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#00c897',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
  },
});