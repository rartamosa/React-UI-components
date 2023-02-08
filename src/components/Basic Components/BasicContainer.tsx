import styled, { css } from "styled-components";

const BasicContainer = styled.div<{
  containerBorderColor?: string;
  containerBorderWidth?: string;
  componentSize?: "small" | "medium" | "large";
  backgroundColor?: string;
  isDisabled?: boolean;
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
    ${(props) =>
    props.isDisabled &&
    css`
      background-color: #c8c8c8 !important;
      cursor: not-allowed;
    `}  
    background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: 8px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: -0.02em;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  overflow-y: scroll;
  border: ${(props) => props.containerBorderWidth || "1px"} solid
    ${(props) => props.containerBorderColor || "#333"};
`;

export default BasicContainer;
