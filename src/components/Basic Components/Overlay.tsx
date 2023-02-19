import styled, { css } from "styled-components";
import { HorizontalPosition, VerticalPosition } from "../Dialog/DialogProps";

export const Overlay = styled.div<{
  overlayColor?: string;
  dialogPosition?:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, "center-center">
    | "center";
  blockScroll?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  isDialogOpen: boolean;
  onEscClose?: (event: React.KeyboardEvent) => void;
}>`
  z-index: 5;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.overlayColor || "rgba(0, 0, 0, 0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.dialogPosition === "left-center" &&
    css`
      justify-content: flex-start;
    `}
  ${(props) =>
    props.dialogPosition === "right-center" &&
    css`
      justify-content: flex-end;
    `}
      ${(props) =>
    props.dialogPosition === "center-top" &&
    css`
      align-items: start;
    `}
      ${(props) =>
    props.dialogPosition === "left-top" &&
    css`
      align-items: start;
      justify-content: start;
    `}
      ${(props) =>
    props.dialogPosition === "right-top" &&
    css`
      align-items: start;
      justify-content: end;
    `}
      ${(props) =>
    props.dialogPosition === "center-bottom" &&
    css`
      align-items: end;
    `}
      ${(props) =>
    props.dialogPosition === "left-bottom" &&
    css`
      align-items: end;
      justify-content: start;
    `}
      ${(props) =>
    props.dialogPosition === "right-bottom" &&
    css`
      align-items: end;
      justify-content: end;
    `};
`;
