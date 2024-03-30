import { AlertType } from '@/components/ui/alert';
import { useState } from 'react';

export interface AlertMessageState {
  message: string;
  title: string;
  type: AlertType;
  duration?: number;
}

const useAlertMessage = () => {
  const [alertState, setAlertState] = useState<AlertMessageState | null>(null);

  const showAlertMessage = (
    title: string,
    message: string,
    type: AlertType,
    duration?: number
  ) => {
    setAlertState({ title, message, type, duration });
  };

  const hideAlertMessage = () => {
    setAlertState(null);
  };

  return {
    alertState,
    showAlertMessage,
    hideAlertMessage,
  };
};

export default useAlertMessage;
