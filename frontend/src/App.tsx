import Notifications from "./components/Notifications"

export default function App() {
  const userId = "your-database-user-id"

  return (
    <div>
      <h1>Notification System</h1>
      <Notifications userId={userId} />
    </div>
  )
}