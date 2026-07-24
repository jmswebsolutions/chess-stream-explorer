import { useState, useEffect } from 'react';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
}

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      
      // Check if notifications were previously enabled
      const savedEnabled = localStorage.getItem('notifications-enabled');
      if (savedEnabled === 'true') {
        setEnabled(true);
      }
    }
  }, []);

  const requestPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      setEnabled(true);
      localStorage.setItem('notifications-enabled', 'true');
      return true;
    }

    if (Notification.permission !== 'denied') {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        setEnabled(true);
        localStorage.setItem('notifications-enabled', 'true');
        return true;
      }
    }

    return false;
  };

  const showNotification = ({ title, body, icon }: NotificationOptions) => {
    if (!enabled || Notification.permission !== 'granted') {
      return;
    }

    new Notification(title, {
      body,
      icon: icon || '/vite.svg',
    });
  };

  const toggleNotifications = () => {
    if (enabled) {
      setEnabled(false);
      localStorage.setItem('notifications-enabled', 'false');
    } else {
      requestPermission();
    }
  };

  return {
    permission,
    enabled,
    requestPermission,
    showNotification,
    toggleNotifications,
  };
};
