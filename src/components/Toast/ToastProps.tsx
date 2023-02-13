import { IconName } from "@fortawesome/fontawesome-svg-core";

export type ToastProps = {
  toastList: SingleToastProps[];
  animationType?: "fadein" | "grow" | "slide";
  onToastRemove: (id: string) => void;
  toastsPosition?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
};

export type ToastToAdd = {
  toastHeader: string;
  toastDescription?: string;
  toastBacgroundColor?: string;
  toastFontColor?: string;
  toastIcon?: IconName;
  typeOfToast?: "success" | "error" | "warning" | "info";
  size?: "small" | "medium" | "large";
  boxShadow?: boolean;
};

export type SingleToastProps = ToastToAdd & {
  id: string;
  isUnmounting?: boolean;
  toastsPosition?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
};

export const toastFontColorHex = "#fff";
