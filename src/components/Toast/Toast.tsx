import styled, { css } from "styled-components";
import {
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastProps, toastFontColorHex } from "./ToastProps";
import { determineAnimationType } from "./toastAnimations";

import BasicCloseButton from "../Basic Components/BasicCloseButton";

library.add(
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo
);

const Toast = ({
  toastList,
  animationType,
  onToastRemove,
  toastsPosition,
}: ToastProps) => {
  return (
    <ToastContainerDiv toastsPosition={toastsPosition}>
      {toastList.map(
        ({
          id,
          toastHeader,
          toastDescription,
          toastBacgroundColor,
          toastFontColor = toastFontColorHex,
          toastIcon,
          typeOfToast,
          size,
          boxShadow,
        }) => (
          <SingleToast
            key={id}
            toastBacgroundColor={toastBacgroundColor}
            toastFontColor={toastFontColor}
            typeOfToast={typeOfToast}
            size={size}
            boxShadow={boxShadow}
            animationType={animationType}
          >
            {typeOfToast === "success" ||
              (typeOfToast === undefined && (
                <FontAwesomeIcon
                  icon={
                    toastIcon ? ["fas", toastIcon] : ["fas", "circle-check"]
                  }
                  size="xl"
                />
              ))}

            {typeOfToast === "error" && (
              <FontAwesomeIcon
                icon={
                  toastIcon ? ["fas", toastIcon] : ["fas", "circle-exclamation"]
                }
                size="xl"
              />
            )}

            {typeOfToast === "warning" && (
              <FontAwesomeIcon
                icon={
                  toastIcon
                    ? ["fas", toastIcon]
                    : ["fas", "triangle-exclamation"]
                }
                size="xl"
              />
            )}

            {typeOfToast === "info" && (
              <FontAwesomeIcon
                icon={toastIcon ? ["fas", toastIcon] : ["fas", "circle-info"]}
                size="xl"
              />
            )}

            <ToastDescriptionContainer>
              <BasicCloseButton
                onClick={() => onToastRemove(id)}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  paddingRight: "7px",
                }}
              >
                &times;
              </BasicCloseButton>
              <ToastHeader toastHeader={toastHeader} size={size}>
                {toastHeader}
              </ToastHeader>
              {toastDescription && (
                <ToastCopy toastDescription={toastDescription} size={size}>
                  {toastDescription}
                </ToastCopy>
              )}
            </ToastDescriptionContainer>
          </SingleToast>
        )
      )}
    </ToastContainerDiv>
  );
};

export default Toast;

export const SingleToast = styled.div<{
  toastBacgroundColor?: string;
  toastFontColor?: string;
  typeOfToast?: "success" | "error" | "warning" | "info";
  size?: "small" | "medium" | "large";
  boxShadow?: boolean;
  animationType?: "fadein" | "grow" | "slide";
  animation?: string;
}>`
  background-color: ${(props) => props.toastBacgroundColor || "#6cbb5a"};
  padding: 10px;
  width: 250px;
  border-radius: 8px;
  display: flex;
  gap: 10px;

  animation-name: ${(props) => determineAnimationType(props.animationType)};
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
    width: 150px;
    font-size: 11px;
    margin-right: 5px;
    ${(props) =>
      props.size === "small" &&
      css`
        width: 100px;
        font-size: 8px;
      `}
    ${(props) =>
      props.size === "large" &&
      css`
        width: 200px;
        font-size: 9px;
      `}
  }
`;

export const ToastDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const ToastHeader = styled.span<{
  toastHeader: string;
  size?: "small" | "medium" | "large";
}>`
  font-weight: 700;
  margin-right: 5px;
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
  margin-right: 5px;
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
    `}
${(props) =>
    props.toastsPosition === "top-left" &&
    css`
      top: 0;
      bottom: unset;
      left: 0;
      margin: 10px 0 0 10px;
    `}
${(props) =>
    props.toastsPosition === "top-right" &&
    css`
      top: 0;
      bottom: unset;
      right: 0;
      margin: 10px 10px 0 0;
    `}
`;
