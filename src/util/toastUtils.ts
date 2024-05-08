import "client-only";

import { Bounce, ToastPosition, toast } from "react-toastify";

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
  toast(message, { ...baseOptions });
};

export const toastLoading = () => {
  toast.info("Loading...", { ...baseOptions });
};

export const toastLogin = (message: string) => {
  toast.info(message, { ...baseOptions });
};

export const toastError = (message: string) => {
  toast.error(message, { ...baseOptions });
};

export const toastSuccess = (message: string) => {
  toast.success(message, { ...baseOptions });
};

export async function tryOrToast(fn: () => Promise<void> | void) {
  try {
    await fn();
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    toastError(errMsg);
  }
}