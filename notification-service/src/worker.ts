import "dotenv/config";
import "@/modules/notification/notification.handler";
import "@/worker/outbox.worker";
import "@/worker/fanout.worker";
import "@/worker/notification.worker";

console.log("Worker running...");
