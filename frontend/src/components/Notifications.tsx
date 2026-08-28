import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import { notificationApi } from "../api/notificationApi";
import {authApi} from "../api/authApi";
import type { Notification } from "../types/notification";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    async function fetchNotifications() {
      const res = await notificationApi.get<Notification[]>(
        "/notifications/me"
      );

      console.log(res.data);
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

  async function handleLogout(){
    try {
      await authApi.post("/auth/logout");

      socket.disconnect();

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl shadow-sm">
                🔔
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Notifications
              </h1>
            </div>

            <p className="text-sm text-slate-500">
              Stay up to date with your latest activity.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {notifications.length > 0 && (
              <span className="hidden rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-600 sm:block">
                {notifications.length}{" "}
                {notifications.length === 1
                  ? "notification"
                  : "notifications"}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Empty State */}
        {notifications.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
              🔔
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              You're all caught up
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              New notifications will appear here when you receive them.
            </p>
          </section>
        ) : (
          /* Notification List */
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {notifications.map((notification, index) => (
              <article
                key={notification.id}
                className={`group flex gap-4 px-5 py-5 transition hover:bg-slate-50 sm:px-6 ${
                  index !== notifications.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                {/* Icon */}
                <div className="flex shrink-0 pt-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-lg">
                    🔔
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold leading-6 text-slate-900">
                      {notification.title}
                    </h2>

                    {"createdAt" in notification && (
                      <time className="shrink-0 text-xs text-slate-400">
                        {new Date(
                          notification.createdAt as string
                        ).toLocaleDateString()}
                      </time>
                    )}
                  </div>

                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {notification.body}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />

                    <span className="text-xs font-medium text-blue-600">
                      New notification
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

