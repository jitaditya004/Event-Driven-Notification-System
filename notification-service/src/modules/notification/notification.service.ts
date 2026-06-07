import {
  NotificationType,
  NotificationChannel,
  NotificationStatus
} from "@prisma/client";

import * as repo from "./notification.repository";

export type CreateNotificationInput = {
  userId: string;
  type: NotificationType;
  channel?: NotificationChannel;
  status?: NotificationStatus;
  title: string;
  body: string;
  idempotencyKey: string;
};

export const createNotification = async (
  data: CreateNotificationInput
) => {
  return repo.createNotification(data);
};

export const getNotifications = async (
  userId: string
) => {
  return repo.getUserNotifications(userId);
};