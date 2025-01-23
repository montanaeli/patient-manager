import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Patient, PatientFormData } from '../types/patient';

interface PatientFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: PatientFormData) => void;
  initialData?: Patient;
}

const PatientForm: React.FC<PatientFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<PatientFormData>({
    name: '',
    avatar: '',
    description: '',
    website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        avatar: initialData.avatar,
        description: initialData.description,
        website: initialData.website,
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.avatar.trim()) {
      newErrors.avatar = 'Avatar URL is required';
    } else if (!formData.avatar.startsWith('http')) {
      newErrors.avatar = 'Please enter a valid URL';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    } else if (!formData.website.startsWith('http')) {
      newErrors.website = 'Please enter a valid URL';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      onClose();
      setFormData({
        name: '',
        avatar: '',
        description: '',
        website: '',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>
              {initialData ? 'Edit Patient' : 'Add New Patient'}
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Enter patient name"
              />
              {errors.name && <Text style={styles.error}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Avatar URL</Text>
              <TextInput
                style={styles.input}
                value={formData.avatar}
                onChangeText={(text) => setFormData({ ...formData, avatar: text })}
                placeholder="Enter avatar URL"
              />
              {errors.avatar && <Text style={styles.error}>{errors.avatar}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                value={formData.website}
                onChangeText={(text) => setFormData({ ...formData, website: text })}
                placeholder="Enter website URL"
              />
              {errors.website && <Text style={styles.error}>{errors.website}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Enter description"
                multiline
                numberOfLines={4}
              />
              {errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>
                  {initialData ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  submitButton: {
    backgroundColor: '#2c369b',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PatientForm;