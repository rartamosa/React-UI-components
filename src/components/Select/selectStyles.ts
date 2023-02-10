import styled, { css } from "styled-components";

export const SelectedOption = styled.div<{
  backgroundColor?: string;
}>`
  height: 20px;
  margin-bottom: -1px;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border: none;
  flex-grow: 1;
`;

export const Options = styled.ul<{
  backgroundColor?: string;
  componentSize?: "small" | "medium" | "large";
}>`
  padding: 10px;
  left: 0;
  top: 43px;
  max-height: 102px;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      top: 21px;
      padding: 5px;
      max-height: 67px;
      min-height: 67px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
    css`
      top: 65px;
      padding: 15px;
      max-height: 157px;
      min-height: 157px;
    `}
    overflow-x: auto;
  width: inherit;
  border: 1px solid #000;
  margin: 0;
  position: absolute;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  li {
    list-style-type: none;
    cursor: pointer;
    ${(props) =>
      props.componentSize === "small" &&
      css`
        line-height: 11px;
      `}
    ${(props) =>
      props.componentSize === "large" &&
      css`
        line-height: 25px;
      `}
  }
`;
