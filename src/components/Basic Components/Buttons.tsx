import styled, { css } from "styled-components";

export const Button = styled.button<{
  buttonProps?: React.CSSProperties;
}>`
  border-radius: 8px;
  padding: 5px 10px;
  border-style: unset;
  cursor: pointer;
  ${(props) =>
    props.buttonProps &&
    css`
      ${{ ...props.buttonProps }}
    `}
`;

export const ActionButton = styled(Button)<{
  buttonProps?: React.CSSProperties;
  actionButtonColor?: string;
}>`
  background-color: ${(props) =>
    props.actionButtonColor
      ? props.actionButtonColor
      : props.buttonProps?.backgroundColor};
`;

export const CancelButton = styled(Button)<{
  buttonProps?: React.CSSProperties;
  cancelButtonColor?: string;
}>`
  background-color: ${(props) =>
    props.cancelButtonColor
      ? props.cancelButtonColor
      : props.buttonProps?.backgroundColor};
`;
