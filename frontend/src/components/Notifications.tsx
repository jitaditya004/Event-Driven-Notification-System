import { useEffect, useState } from "react"
import { socket } from "../lib/socket"
import type { Notification } from "../types/notification"

type Props = {
  userId: string
}

export default function Notifications({ userId }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    socket.connect()
    socket.emit("join", userId)

    socket.on("notification", notification => {
      setNotifications(prev => [notification, ...prev])
    })

    return () => {
      socket.off("notification")
      socket.disconnect()
    }
  }, [userId])

  return (
    <div>
      <h2>🔔 Notifications</h2>

      {notifications.map(notification => (
        <div key={notification.id}>
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      ))}
    </div>
  )
}