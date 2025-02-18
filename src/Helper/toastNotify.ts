import { Bounce, toast, TypeOptions } from "react-toastify";

const toastNotify = (message: string, type: TypeOptions = "success") => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    type: type,
  });
};
export default toastNotify;
