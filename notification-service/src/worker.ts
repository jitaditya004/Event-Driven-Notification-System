import "dotenv/config"
import "@/modules/notification/notification.handler"
import "@/worker/notification.worker"
import "@/worker/outbox.worker"

console.log(
  "Worker running..."
)