import { useEffect } from "react";
import PropTypes from "prop-types";

const Notification = ({ text, notificationType, clearNotification }) => {
  useEffect(() => {
    if (text && notificationType) {
      const timeOut = setTimeout(() => {
        clearNotification();
      }, 5000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [text, notificationType, clearNotification]);

  if (!text || !notificationType) {
    return null;
  }

  return (
    <div className={notificationType === "success" ? "success" : "error"}>
      <p>{text}</p>
    </div>
  );
};

Notification.propTypes = {
  text: PropTypes.string,
  notificationType: PropTypes.string,
  clearNotification: PropTypes.func,
};

export default Notification;