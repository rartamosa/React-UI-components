import styled, { css } from "styled-components";

const BasicCloseButton = styled.span<{
  componentSize?: "small" | "medium" | "large";
}>`
  font-size: 21px;
  align-self: center;
  ${(props) =>
    props.componentSize === "small" &&
    css`
      font-size: 11px;
    `}
  ${(props) =>
    props.componentSize === "large" &&
    css`
      font-size: 32px;
    `}
    justify-self: flex-end;
  cursor: pointer;
`;
export default BasicCloseButton;
