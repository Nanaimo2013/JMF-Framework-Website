import React, { useState, createContext, useContext } from 'react';
import Notification, { NotificationType } from './Notification';

interface NotificationItem {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  createdAt: number; // Add timestamp for sorting
}

interface NotificationContextProps {
  addNotification: (message: string, type: NotificationType, duration?: number) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (message: string, type: NotificationType, duration = 5000) => {
    const id = Math.random().toString(36).substring(2, 9);
    // Add new notification with timestamp
    setNotifications((prev) => [
      ...prev,
      { 
        id, 
        message, 
        type, 
        duration,
        createdAt: Date.now() 
      }
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Sort notifications by creation time to ensure proper stacking order
  const sortedNotifications = [...notifications].sort((a, b) => a.createdAt - b.createdAt);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="notification-container">
        {sortedNotifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
            isVisible={true}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider; 