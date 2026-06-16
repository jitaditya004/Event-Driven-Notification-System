import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { notificationApi } from "../api/notificationApi";
import type { Notification } from "../types/notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await notificationApi.get<Notification[]>("/notifications/me");

      setNotifications(res.data);
    }

    fetchNotifications();
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("notification", (notification: Notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-10">
      <section className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">🔔 Notifications</h1>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <article
              key={notification.id}
              className="rounded-xl bg-white p-5 shadow"
            >
              <h2 className="font-semibold">{notification.title}</h2>

              <p className="text-gray-600">{notification.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
