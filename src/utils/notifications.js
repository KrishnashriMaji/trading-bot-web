export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  }
  return false;
};

export const showBrowserNotification = (title, options = {}) => {
  if ("Notification" in window && Notification.permission === "granted") {
    return new Notification(title, {
      icon: "/logo.png",
      badge: "/logo.png",
      ...options,
    });
  }
};
