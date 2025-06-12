import MainLayout from "@/layouts/MainLayout";
import { useNotifications } from "@/hooks/use-notifications";
import { useRouter } from "next/router";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export default function Notifications() {
  const { notifications, loading, error, markAsRead, markAllAsRead, isRead } = useNotifications();
  const router = useRouter();

  const handleNotificationClick = async (notification: any) => {
    await markAsRead(notification.id);
    
    // Redirect based on notification type
    switch (notification.type) {
      case 'job':
        router.push('/work');
        break;
      case 'formation':
        router.push('/formacion-continua');
        break;
      case 'event':
        router.push('/calendar');
        break;
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center text-red-500 p-4">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white px-4">
          {notifications.length > 0 && (
            <div className="flex justify-end py-4">
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Marcar todas como leídas
              </button>
            </div>
          )}
          <section className="divide-y divide-gray-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No hay notificaciones
              </div>
            ) : (
              notifications.map((notification) => {
                const read = isRead(notification.id);
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:bg-gray-50/80 cursor-pointer transition-all duration-200 ${
                      read ? 'bg-gray-50/30' : 'bg-white'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          notification.type === 'job' ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                          notification.type === 'formation' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                          'bg-gradient-to-br from-purple-500 to-purple-600'
                        }`}>
                          {notification.type === 'job' && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          )}
                          {notification.type === 'formation' && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          )}
                          {notification.type === 'event' && (
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className={`text-gray-800 ${read ? 'font-normal' : 'font-medium'}`}>
                            {notification.content}
                          </p>
                          {!read && (
                            <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDistanceToNow(new Date(notification.created_at), {
                            addSuffix: true,
                            locale: es
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
