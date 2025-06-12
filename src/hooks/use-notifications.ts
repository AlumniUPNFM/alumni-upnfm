import { useEffect, useState } from "react";
import { GetNotifications } from "@/services/notifications";
import { Notification } from "@/services/notifications.types";
import { subMonths } from "date-fns";

interface UseNotificationsHook {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: number) => void;
  isRead: (id: number) => boolean;
}

const STORAGE_KEY = "readNotifications";

export const useNotifications = (): UseNotificationsHook => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getReadNotifications = (): number[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const updateUnreadCount = (notifs: Notification[]) => {
    const readIds = getReadNotifications();
    const oneMonthAgo = subMonths(new Date(), 1);
    
    // Mark notifications older than a month as read
    const oldNotifications = notifs
      .filter(n => new Date(n.created_at) < oneMonthAgo)
      .map(n => n.id);
    
    if (oldNotifications.length > 0) {
      const updatedReadIds = [...new Set([...readIds, ...oldNotifications])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReadIds));
    }

    const unread = notifs.filter(n => {
      const isOld = new Date(n.created_at) < oneMonthAgo;
      return !readIds.includes(n.id) && !isOld;
    }).length;
    
    setUnreadCount(unread);
  };

  const isRead = (id: number): boolean => {
    const readIds = getReadNotifications();
    const notification = notifications.find(n => n.id === id);
    if (!notification) return false;
    
    const isOld = new Date(notification.created_at) < subMonths(new Date(), 1);
    return readIds.includes(id) || isOld;
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await GetNotifications();
      if (response.isSuccess && response.data) {
        setNotifications(response.data.notifications);
        updateUnreadCount(response.data.notifications);
      } else {
        setError(response.message || "Error al cargar las notificaciones");
      }
    } catch (err) {
      setError("Error al cargar las notificaciones");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: number) => {
    const readIds = getReadNotifications();
    if (!readIds.includes(id)) {
      const updatedReadIds = [...readIds, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReadIds));
      updateUnreadCount(notifications);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refreshNotifications: fetchNotifications,
    markAsRead,
    isRead,
  };
}; 