import styled, { css } from "styled-components";

const BasicInput = styled.input<{
  componentSize?: "small" | "medium" | "large";
  backgroundColor?: string;
  isDisabled?: boolean;
}>`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      font-size: 7px;
      line-height: 8px;
      letter-spacing: -0.03em;
    `}
  ${(props) =>
    props.componentSize === "large" &&
    css`
      font-size: 21px;
      line-height: 24px;
      letter-spacing: -0.01em;
    `}
    font-weight: 700;
  border: none;
  outline: none;
  min-width: 15%;
  flex-grow: 1;
  background-color: ${(props) => props.backgroundColor || "#fff"};
  &:disabled {
    background-color: #c8c8c8;
    cursor: not-allowed;
  }
`;

export default BasicInput;
