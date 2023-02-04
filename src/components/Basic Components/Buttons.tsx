import styled, { css } from "styled-components";

export const Button = styled.button<{
  buttonProps?: React.CSSProperties;
  buttonText: string;
}>`
  border-radius: 8px;
  padding: 5px 10px;
  border-style: unset;
  ${(props) =>
    props.buttonProps &&
    css`
      ${{ ...props.buttonProps }}
    `}
`;

export const ActionButton = styled(Button)<{
  buttonProps?: React.CSSProperties;
  actionButtonColor?: string;
  actionButtonText: string;
}>`
  background-color: ${(props) =>
    props.actionButtonColor
      ? props.actionButtonColor
      : props.buttonProps?.backgroundColor};
`;

export const CancelButton = styled(Button)<{
  buttonProps?: React.CSSProperties;
  cancelButtonColor?: string;
  cancelButtonText: string;
}>`
  background-color: ${(props) =>
    props.cancelButtonColor
      ? props.cancelButtonColor
      : props.buttonProps?.backgroundColor};
`;
