import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

import {
  DialogProps,
  HorizontalPosition,
  VerticalPosition,
} from "./DialogProps";

const Dialog = ({
  onAction,
  onCancel,
  buttonProps,
  dialogHeader,
  dialogBody,
  actionButtonColor,
  cancelButtonColor,
  dialogButtonText,
  actionButtonText,
  cancelButtonText,
  overlayColor,
  dialogPosition,
  blockScroll,
  closeOnEsc, //TODO
  closeOnOverlayClick,
}: DialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [onBlockScroll, setOnBlockScroll] = useState(blockScroll);

  useEffect(() => {
    if (onBlockScroll && isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDialogOpen]);

  const onOpen = (): void => {
    setIsDialogOpen(true);
    // if (blockScroll && isDialogOpen) {
    //   setOnBlockScroll(true);
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "scroll";
    // }
  };

  const onInternalAction = (): void => {
    setIsDialogOpen(false);
    onAction();
  };

  const onInternalCancel = (): void => {
    if (onCancel) {
      setIsDialogOpen(false);
      onCancel();
      //   setOnBlockScroll(false);
    } else {
      setIsDialogOpen(false);
      //   setOnBlockScroll(false);
    }
  };

  const onEscClose = (event: React.KeyboardEvent): void => {
    if (closeOnEsc && event.key === "Escape") {
      onInternalCancel();
    }
  };

  const onOverlayClickClose = (): void => {
    if (closeOnOverlayClick) {
      onInternalCancel();
    }
  };

  return (
    <>
      <DialogButton
        onClick={onOpen}
        buttonProps={buttonProps}
        dialogButtonText={dialogButtonText}
      >
        {dialogButtonText}
      </DialogButton>

      {isDialogOpen && (
        <AlertDialog isDialogOpen={isDialogOpen} onEscClose={onEscClose}>
          <AlertDialogOverLay
            overlayColor={overlayColor}
            dialogPosition={dialogPosition}
            blockScroll={blockScroll}
            closeOnEsc={closeOnEsc}
            onKeyDown={onEscClose}
            closeOnOverlayClick={closeOnOverlayClick}
            onClick={onOverlayClickClose}
          >
            <AlertDialogWindow onClick={(event) => event.stopPropagation()}>
              <AlertDialogHeader dialogHeader={dialogHeader}>
                {dialogHeader}
              </AlertDialogHeader>
              <AlertDialogBody dialogBody={dialogBody}>
                {dialogBody}
              </AlertDialogBody>
              <AlertDialogFooter>
                <CancelButton
                  onClick={onInternalCancel}
                  buttonProps={buttonProps}
                  cancelButtonColor={cancelButtonColor}
                  dialogButtonText={dialogButtonText}
                  cancelButtonText={cancelButtonText}
                >
                  {cancelButtonText}
                </CancelButton>
                <ActionButton
                  onClick={onInternalAction}
                  buttonProps={buttonProps}
                  actionButtonColor={actionButtonColor}
                  dialogButtonText={dialogButtonText}
                  actionButtonText={actionButtonText}
                >
                  {actionButtonText}
                </ActionButton>
              </AlertDialogFooter>
            </AlertDialogWindow>
          </AlertDialogOverLay>
        </AlertDialog>
      )}
    </>
  );
};

export default Dialog;

export const DialogButton = styled.button<{
  buttonProps?: React.CSSProperties;
  dialogButtonText: string;
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

export const ActionButton = styled(DialogButton)<{
  buttonProps?: React.CSSProperties;
  actionButtonColor?: string;
  actionButtonText: string;
}>`
  background-color: ${(props) =>
    props.actionButtonColor
      ? props.actionButtonColor
      : props.buttonProps?.backgroundColor};
`;

export const CancelButton = styled(DialogButton)<{
  buttonProps?: React.CSSProperties;
  cancelButtonColor?: string;
  cancelButtonText: string;
}>`
  background-color: ${(props) =>
    props.cancelButtonColor
      ? props.cancelButtonColor
      : props.buttonProps?.backgroundColor};
`;

export const AlertDialog = styled.div<{
  isDialogOpen: boolean;
  onEscClose: (event: React.KeyboardEvent) => void;
}>``;

export const AlertDialogOverLay = styled.div<{
  overlayColor?: string;
  dialogPosition?:
    | Exclude<`${HorizontalPosition}-${VerticalPosition}`, "center-center">
    | "center";
  blockScroll?: boolean;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
}>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.overlayColor || "rgba(0, 0, 0, 0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: ${(props) => (props.blockScroll === true ? "hidden" : "auto")}
    ${(props) =>
      props.dialogPosition === "left-center" &&
      css`
        justify-content: start;
      `}
    ${(props) =>
      props.dialogPosition === "right-center" &&
      css`
        justify-content: end;
      `}
    ${(props) =>
      props.dialogPosition === "center-top" &&
      css`
        align-items: start;
      `}
    ${(props) =>
      props.dialogPosition === "left-top" &&
      css`
        align-items: start;
        justify-content: start;
      `}
    ${(props) =>
      props.dialogPosition === "right-top" &&
      css`
        align-items: start;
        justify-content: end;
      `}
    ${(props) =>
      props.dialogPosition === "center-bottom" &&
      css`
        align-items: end;
      `}
    ${(props) =>
      props.dialogPosition === "left-bottom" &&
      css`
        align-items: end;
        justify-content: start;
      `}
    ${(props) =>
      props.dialogPosition === "right-bottom" &&
      css`
        align-items: end;
        justify-content: end;
      `};
`;

export const AlertDialogWindow = styled.div`
  width: 400px;
  height: 300px;
  background-color: #fff;
  z-index: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  gap: 10px;
  height: auto;
  min-height: 120px;
  margin: 30px;
  box-sizing: border-box;
`;

export const AlertDialogHeader = styled.h5<{ dialogHeader: string }>`
  font-size: 20px;
  margin: 10px 0;
  align-self: start;
`;

export const AlertDialogBody = styled.span<{ dialogBody: string }>`
  font-size: 15px;
`;

export const AlertDialogFooter = styled.div`
  display: flex;
  align-self: end;
  gap: 20px;
  margin-top: 20px;
`;
