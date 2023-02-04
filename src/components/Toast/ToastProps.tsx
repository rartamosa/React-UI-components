import { IconName } from "@fortawesome/fontawesome-svg-core";

export type ToastProps = {
  buttonText: string;
  toastHeader: string;
  toastDescription?: string;
  buttonProps?: React.CSSProperties;
  toastTimeout?: number;
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

  //   closeOnEsc?: boolean;
  //   size?: "small" | "medium" | "large";
};
