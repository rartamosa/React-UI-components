import React, { useState, useEffect } from "react";
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
import {
  fadeInAnimation,
  growAnimation,
  useDelayUnmount,
} from "./toastAnimations";
import { Button } from "../Basic Components/Buttons";
import BasicCloseButton from "../Basic Components/BasicCloseButton";

library.add(
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo
);

const Toast = ({
  buttonText = "Show toast",
  buttonProps,
  toastHeader = "Example toast header",
  toastDescription = "Example toast description",
  toastTimeout = 4000,
  toastBacgroundColor,
  toastFontColor = toastFontColorHex,
  toastIcon,
  typeOfToast,
  toastPosition = "bottom-center",
  size,
  boxShadow = false,
  animationType,
}: ToastProps) => {
  const [isToastVisible, setIsToastVisible] = useState(false);

  // https://stackoverflow.com/questions/40064249/react-animate-mount-and-unmount-of-a-single-component
  const [isMounted, setIsMounted] = useState(true);
  const shouldRenderChild = useDelayUnmount(isMounted, 500);
  // const mountedStyle = { animation: `${fadeInAnimation} 2s linear forwards` };
  const mountedStyle = { animation: "fadeInAnimation 5s linear forwards" }; //TODO
  const unmountedStyle = {
    animation: "fadeInAnimation 5s linear forwards reverse",
  };
  // const unmountedStyle = {
  //   animation: `${fadeInAnimation} 2s linear forwards reverse`,
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsToastVisible(false);
      setIsMounted(false);
    }, toastTimeout);
    return () => setIsMounted(false);
  }, [isToastVisible, toastTimeout]);

  const onShowToast = (): void => {
    setIsToastVisible(true);
    setIsMounted(true);
  };

  const onCloseToast = (): void => {
    setIsToastVisible(false);
    setIsMounted(false);
  };

  return (
    <>
      <Button
        buttonText={buttonText}
        buttonProps={buttonProps}
        onClick={onShowToast}
      >
        {buttonText}
      </Button>
      {isToastVisible && shouldRenderChild && (
        <ToastContainer
          toastBacgroundColor={toastBacgroundColor}
          toastFontColor={toastFontColor}
          typeOfToast={typeOfToast}
          toastPosition={toastPosition}
          size={size}
          boxShadow={boxShadow}
          animationType={animationType}
          style={isMounted ? mountedStyle : unmountedStyle}
        >
          {typeOfToast === "success" ||
            (typeOfToast === undefined && (
              <FontAwesomeIcon
                icon={toastIcon ? ["fas", toastIcon] : ["fas", "circle-check"]}
                onClick={onCloseToast}
                size="xl"
              />
            ))}

          {typeOfToast === "error" && (
            <FontAwesomeIcon
              icon={
                toastIcon ? ["fas", toastIcon] : ["fas", "circle-exclamation"]
              }
              onClick={onCloseToast}
              size="xl"
            />
          )}

          {typeOfToast === "warning" && (
            <FontAwesomeIcon
              icon={
                toastIcon ? ["fas", toastIcon] : ["fas", "triangle-exclamation"]
              }
              onClick={onCloseToast}
              size="xl"
            />
          )}

          {typeOfToast === "info" && (
            <FontAwesomeIcon
              icon={toastIcon ? ["fas", toastIcon] : ["fas", "circle-info"]}
              onClick={onCloseToast}
              size="xl"
            />
          )}

          <ToastDescriptionContainer>
            <BasicCloseButton
              onClick={onCloseToast}
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
        </ToastContainer>
      )}
    </>
  );
};

export default Toast;

export const ToastContainer = styled.div<{
  toastBacgroundColor?: string;
  toastFontColor?: string;
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
  animationType?: "fadein" | "grow" | "slide";
}>`
  position: absolute;
  bottom: 0;
  background-color: ${(props) => props.toastBacgroundColor || "#6cbb5a"};
  padding: 10px;
  width: 250px;
  border-radius: 8px;
  display: flex;
  gap: 10px;

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
    props.toastPosition === "bottom-left" &&
    css`
      left: 0;
      margin: 0 0 10px 10px;
    `}
${(props) =>
    props.toastPosition === "bottom-right" &&
    css`
      right: 0;
      margin: 0 10px 10px 0;
    `}
${(props) =>
    props.toastPosition === "top-center" &&
    css`
      top: 0;
      bottom: unset;
      margin: 10px 0 0 0;
    `}
${(props) =>
    props.toastPosition === "top-left" &&
    css`
      top: 0;
      bottom: unset;
      left: 0;
      margin: 10px 0 0 10px;
    `}
${(props) =>
    props.toastPosition === "top-right" &&
    css`
      top: 0;
      bottom: unset;
      right: 0;
      margin: 10px 10px 0 0;
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
