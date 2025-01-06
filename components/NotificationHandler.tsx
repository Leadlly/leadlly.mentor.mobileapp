import { useEffect, useRef } from "react";
import { AppState, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

// Define the shape of our notification data
interface NotificationData {
  type: "chat_message" | "daily_reminder";
  data: {
    [key: string]: any;
  };
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Define the background task name
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND_NOTIFICATION_TASK";

// Register the background task
TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    if (error) {
      console.error("Background task failed:", error);
      return;
    }
    if (data) {
      console.log("TaskManager Data ======> ", data);

      const { notification } = data as {
        notification: Notifications.Notification;
      };
      handleBackgroundNotification(notification);
    }
  }
);

// Function to handle background notifications
function handleBackgroundNotification(
  notification: Notifications.Notification
) {
  console.log("Raw notification data:", notification);

  let notificationData: NotificationData;

  if ("request" in notification && "content" in notification.request) {
    // Structure for foreground notifications
    notificationData = notification.request.content.data as NotificationData;
    console.log("Request.Content Data ======> ", notificationData);
  } else if ("data" in notification) {
    // Structure for background notifications
    notificationData = notification.data as NotificationData;
    console.log("Request.data Data ======> ", notificationData);
  } else {
    console.error("Unexpected notification structure:", notification);
    return;
  }

  switch (notificationData.type) {
    case "chat_message":
      console.log("Background: Received a chat message notification");
      // You might want to update a database or send an event to your analytics service
      break;
    case "daily_reminder":
      console.log("Background: Received a daily reminder notification");
      // You might want to schedule a local notification or update app badge
      break;
    default:
      console.log("Background: Received an unknown notification type");
  }
}

// Main component for handling notifications
export default function NotificationHandler() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    setupNotificationHandlers();

    // Listen for app state changes
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        // App has come to the foreground, check for any missed notifications
        checkMissedNotifications();
      }
      appState.current = nextAppState;
    });

    return () => {
      cleanupNotificationHandlers();
      subscription.remove();
    };
  }, []);

  const setupNotificationHandlers = async () => {
    // Handler for foreground notifications
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        handleForegroundNotification(notification);
      });

    // Handler for when a user taps on a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        handleNotificationResponse(response);
      });

    // Set up background handler
    await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  };

  const cleanupNotificationHandlers = () => {
    if (notificationListener.current)
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
    if (responseListener.current)
      Notifications.removeNotificationSubscription(responseListener.current);
    Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  };

  const handleForegroundNotification = (
    notification: Notifications.Notification
  ) => {
    const notificationData = notification.request.content.data;

    console.log("Foreground Notification Data =======> ", notificationData);

    // switch (notificationData.type) {
    //   case "chat_message":
    //     console.log("Foreground: Received a chat message notification");
    //     // Update chat UI or show an in-app notification
    //     break;
    //   case "daily_reminder":
    //     console.log("Foreground: Received a daily reminder notification");
    //     // Show a reminder alert or update reminder UI
    //     break;
    //   default:
    //     console.log("Foreground: Received an unknown notification type");
    // }
  };

  const handleNotificationResponse = (
    response: Notifications.NotificationResponse
  ) => {
    const notificationData = response.notification.request.content
      .data as NotificationData;

    console.log("Background Notification Data ======> ", notificationData);

    switch (notificationData.type) {
      case "chat_message":
        console.log("Chat message received");

        break;
      case "daily_reminder":
        console.log("Daily Reminders notification received");

        break;
      default:
        console.log("Responded to an unknown notification type");
    }
  };

  const checkMissedNotifications = async () => {
    const notifications = await Notifications.getPresentedNotificationsAsync();
    notifications.forEach((notification) => {
      // Process any notifications that were received while the app was closed
      handleForegroundNotification(notification);
    });
  };

  return null;
}
