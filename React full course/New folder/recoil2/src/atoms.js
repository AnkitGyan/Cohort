import { atom, selector } from "recoil";
import axios from "axios";

// Atom with default data fetched from server
export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "notificationSelector",
    get: async () => {
  try {
    const res = await axios.get("https://sum-server.100xdevs.com/notifications");
    return res.data;
  } catch (e) {
    console.error("Failed to fetch notifications", e);
    return { network: 0, jobs: 0, notifications: 0, messaging: 0 };
  }
}

  })
});

// Selector to compute total notifications
export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.notifications +
      allNotifications.messaging
    );
  }
});
