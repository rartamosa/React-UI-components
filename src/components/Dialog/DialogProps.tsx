export type HorizontalPosition = "left" | "center" | "right";
export type VerticalPosition = "top" | "center" | "bottom";

export type DialogProps = {
  onAction: () => void;
  onCancel: () => void;
  isDialogOpen: boolean;
  buttonProps?: React.CSSProperties;
  dialogHeader: string;
  dialogBody: string;
  actionButtonColor?: string;
  cancelButtonColor?: string;
  buttonText: string;
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
