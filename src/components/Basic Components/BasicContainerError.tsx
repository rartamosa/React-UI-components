import styled, { css } from "styled-components";

import { MAIN_DARK_FONT_COLOR } from "../../utils/commons";

const BasicContainerError = styled.div<{
  errorBorderColor?: string;
  containerBorderWidth?: string;
  componentSize?: "small" | "medium" | "large";
}>`
  width: 300px;
  height: 44px;
  padding: 8px;
  gap: 8px;
  font-size: 14px;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      width: 150px;
      height: 22px;
      padding: 4px;
      gap: 4px;
      font-size: 7px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
    css`
      width: 450px;
      height: 66px;
      padding: 12px;
      gap: 12px;
      font-size: 21px;
    `}  
    border: ${(props) => props.containerBorderWidth || "1px"} solid
      ${(props) => props.errorBorderColor || MAIN_DARK_FONT_COLOR};
  z-index: 1;
  position: absolute;
  border-radius: 8px;
  box-sizing: border-box;
`;

export default BasicContainerError;