import { useState } from 'react';
import { Alert } from 'react-native';

interface ToastState {
  visible: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const useNotifications = () => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'info',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => {
    Alert.alert(
      title,
      message,
      [
        onCancel
          ? {
              text: 'Cancel',
              onPress: onCancel,
              style: 'cancel',
            }
          : undefined,
        {
          text: 'OK',
          onPress: onConfirm,
        },
      ].filter(Boolean) as any
    );
  };

  return {
    toast,
    showToast,
    hideToast,
    showAlert,
  };
};

export default useNotifications;