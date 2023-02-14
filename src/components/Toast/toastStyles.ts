import styled, { css } from "styled-components";
import { determineAnimationType } from "./toastAnimations";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SingleToast = styled.div<{
  toastBacgroundColor?: string;
  toastFontColor?: string;
  typeOfToast?: "success" | "error" | "warning" | "info";
  size?: "small" | "medium" | "large";
  boxShadow?: boolean;
  animationType?: "fade" | "grow" | "slide";
  animation?: string;
  isUnmounting?: boolean;
  toastsPosition?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
}>`
  background-color: ${(props) => props.toastBacgroundColor || "#6cbb5a"};
  padding: 10px;
  width: 250px;
  border-radius: 8px;
  display: flex;
  gap: 10px;

  animation-name: ${(props) =>
    determineAnimationType(
      props.animationType,
      props.toastsPosition,
      props.isUnmounting
    )};
  animation-duration: 0.2s;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  ${(props) =>
    props.boxShadow &&
    css`
      box-shadow: 3px 3px 10px -1px rgba(51, 51, 51, 1);
    `}

  color: ${(props) => props.toastFontColor};
  margin: 0 0 10px 0;

  ${(props) =>
    props.typeOfToast === "error" &&
    css`
      background-color: ${props.toastBacgroundColor
        ? props.toastBacgroundColor
        : "#f62e36"};
    `}

  ${(props) =>
    props.typeOfToast === "warning" &&
    css`
      background-color: ${props.toastBacgroundColor
        ? props.toastBacgroundColor
        : "#ff9500"};
    `}

    ${(props) =>
    props.typeOfToast === "info" &&
    css`
      background-color: ${props.toastBacgroundColor
        ? props.toastBacgroundColor
        : "#00a7db"};
    `}
  
      ${(props) =>
    props.size === "small" &&
    css`
      width: 150px;
      font-size: 11px;
      margin-right: 5px;
    `}

      ${(props) =>
    props.size === "large" &&
    css`
      width: 350px;
    `}
  
      @media (max-width: 768px) {
    width: 250px;
    font-size: 11px;
    margin-right: 5px;
    ${(props) =>
      props.size === "small" &&
      css`
        width: 150px;
        font-size: 8px;
      `}
    ${(props) =>
      props.size === "large" &&
      css`
        width: 90%;
        font-size: 9px;
      `}
  }
`;

export const ToastDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const ToastHeader = styled.span<{
  toastHeader: string;
  size?: "small" | "medium" | "large";
}>`
  font-weight: 700;
  position: relative;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 11px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 20px;
    `}
`;

export const ToastCopy = styled.span<{
  toastDescription?: string;
  size?: "small" | "medium" | "large";
}>`
  font-size: 13px;
  ${(props) =>
    props.size === "small" &&
    css`
      font-size: 9px;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      font-size: 17px;
    `}
`;

export const ToastContainerDiv = styled.div<{
  toastsPosition?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
}>`
  position: absolute;
  bottom: 0;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  ${(props) =>
    props.toastsPosition === "bottom-left" &&
    css`
      left: 0;
      margin: 0 0 10px 10px;
    `}
  ${(props) =>
    props.toastsPosition === "bottom-right" &&
    css`
      right: 0;
      margin: 0 10px 10px 0;
    `}
  ${(props) =>
    props.toastsPosition === "top-center" &&
    css`
      top: 0;
      bottom: unset;
      margin: 10px 0 0 0;
      flex-direction: column;
    `}
  ${(props) =>
    props.toastsPosition === "top-left" &&
    css`
      top: 0;
      bottom: unset;
      left: 0;
      margin: 10px 0 0 10px;
      flex-direction: column;
    `}
  ${(props) =>
    props.toastsPosition === "top-right" &&
    css`
      top: 0;
      bottom: unset;
      right: 0;
      margin: 10px 10px 0 0;
      flex-direction: column;
    `}
    @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

export const ToastCloseButton = styled(FontAwesomeIcon)<{
  iconSize?: "small" | "medium" | "large";
}>`
  cursor: pointer;
  align-self: baseline;
  font-size: 15px;
  ${(props) =>
    props.iconSize === "small" &&
    css`
      font-size: 15px;
    `}
  @media (max-width: 768px) {
    ${(props) =>
      props.iconSize === "large" &&
      css`
        font-size: 15px;
      `}
  }
`;

export const ToastIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
`;
