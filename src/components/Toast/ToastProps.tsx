import { IconName } from "@fortawesome/fontawesome-svg-core";

export type ToastProps = {
  toastList: SingleToastProps[];
  animationType?: "fadein" | "grow" | "slide";
  onToastRemove: (id: string) => void;
};

export type ToastToAdd = {
  toastHeader: string;
  toastDescription?: string;
  toastBacgroundColor?: string;
  toastFontColor?: string;
  toastIcon?: IconName;
  typeOfToast?: "success" | "error" | "warning" | "info";
  toastPosition?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
  size?: "small" | "medium" | "large";
  boxShadow?: boolean;
};

export type SingleToastProps = ToastToAdd & {
  id: string;
};

export const toastFontColorHex = "#fff";
