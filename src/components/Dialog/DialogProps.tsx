export type HorizontalPosition = "left" | "center" | "right";
export type VerticalPosition = "top" | "center" | "bottom";

export type DialogProps = {
  onAction: () => void;
  onCancel?: () => void;
  buttonProps?: React.CSSProperties;
  dialogHeader: string;
  dialogBody: string;
  actionButtonColor?: string;
  cancelButtonColor?: string;
  dialogButtonText: string;
  actionButtonText: string;
  cancelButtonText: string;
  overlayColor?: string;
  dialogPosition?:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, "center-center">
    | "center";
  size?: "small" | "medium" | "large";
  blockScroll?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
};
