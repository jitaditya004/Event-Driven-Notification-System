import { eventBus } from "@/events/eventBus"
import "@/modules/notification/notification.handler"

eventBus.emit("USER_REGISTERED", {
  userId: "test-user-id"
})

console.log("Event emitted")