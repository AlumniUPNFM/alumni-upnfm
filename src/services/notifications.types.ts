export type NotificationType = 'job' | 'formation' | 'event';

export interface Notification {
  id: number;
  created_at: string;
  content: string;
  type: NotificationType;
}

export interface NotificationResponse {
  notifications: Notification[];
  unreadCount: number;
} 