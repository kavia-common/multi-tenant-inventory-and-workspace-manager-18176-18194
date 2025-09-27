import { createContext, useContext, useEffect, useState } from 'react';

const NotificationContext = createContext(null);

// PUBLIC_INTERFACE
export function NotificationProvider({ children }) {
  /** Provides basic in-app notifications (mock) */
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) setNotifications(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const push = (msg) => {
    setNotifications(prev => [{ id: `n-${Date.now()}`, msg, date: new Date().toISOString() }, ...prev]);
  };

  const clear = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, push, clear }}>
      {children}
    </NotificationContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useNotifications() { return useContext(NotificationContext); }
