import { useState } from "react";
import { FaBell } from "react-icons/fa";

export const Notifications = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleOpenNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    console.log("isNotificationsOpen", isNotificationsOpen);
  };
  return (
    <FaBell className="cursor-pointer" onClick={handleOpenNotifications} />
  );
};
