import { toast } from "react-toastify";

class Notification {
  notif(props) {
    const { message, position, autoClose, theme, type } = props;
    const toastOptions = {
      position: position || "top-right",
      autoClose: autoClose || false,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: false,
      progress: undefined,
      theme: theme || "light",
    };

    switch (type) {
      case "error":
        toast.error(message, toastOptions);
        break;

      case "success":
        toast.success(message, {
          ...toastOptions,
          style: {
            background: "#00C853",
            color: "#FFFFFF",
            borderRadius: "10px",
          },
        });
        break;

      case "warning":
        toast.warning(message, toastOptions);
        break;

      case "info":
        toast.info(message, toastOptions);
        break;

      default:
        toast(message, toastOptions);
    }
  }
}

export default new Notification();
