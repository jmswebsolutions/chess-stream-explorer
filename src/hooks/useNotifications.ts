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
      try {
        const savedEnabled = localStorage.getItem('notifications-enabled');
        if (savedEnabled === 'true') {
          setEnabled(true);
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
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
      try {
        localStorage.setItem('notifications-enabled', 'true');
      } catch (error) {
        console.error('Error saving notification settings:', error);
      }
      return true;
    }

    if (Notification.permission !== 'denied') {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        setEnabled(true);
        try {
          localStorage.setItem('notifications-enabled', 'true');
        } catch (error) {
          console.error('Error saving notification settings:', error);
        }
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
      try {
        localStorage.setItem('notifications-enabled', 'false');
      } catch (error) {
        console.error('Error saving notification settings:', error);
      }
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
