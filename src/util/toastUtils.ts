import "client-only";

import { toast, Bounce, ToastPosition } from "react-toastify";

const baseOptions = {
  position: "bottom-right" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const showToastDemo = (message: string) => {
  console.log(message);
  toast(message, baseOptions);
};

export const toastLogin = (message: string) => {
  toast.info(message, { ...baseOptions, position: "top-left" });
};

export const toastError = (message: string) => {
  toast.error(message, { ...baseOptions, position: "top-left" });
};
