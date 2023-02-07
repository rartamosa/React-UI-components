import styled, { css } from "styled-components";

import { ToastContainerProps } from "./ToastProps";

const ToastContainer = ({
  toastsPosition,
  children,
}: ToastContainerProps): JSX.Element => {
  return (
    <ToastContainerDiv toastsPosition={toastsPosition}>
      {children}
    </ToastContainerDiv>
  );
};

export default ToastContainer;

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
