import { atom, selector } from "recoil";

export const NetworkAtom =atom({
  key: "networkAtom",
  default: 102,
})

export const JobAtom =atom({
  key: "jobAtom",
  default: 0,
})

export const MessageAtom =atom({
  key: "messageAtom",
  default: 0,
})

export const NotificationAtom =atom({
  key: "notificationAtom",
  default: 12,
})

export const TotalNotificationCount = selector({
  key: "totalNotificationCount",
  get : ({get}) =>{
  const NetworkAtomCount = get(NetworkAtom);
  const JobAtomCount = get(JobAtom);
  const MessageAtomCount = get(MessageAtom);
  const NotificationAtomCount = get(NotificationAtom);

  return NetworkAtomCount + JobAtomCount + MessageAtomCount + NotificationAtomCount;
  }
})