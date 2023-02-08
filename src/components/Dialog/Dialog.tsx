import React, { useEffect } from "react";
import styled from "styled-components";

import { DialogProps } from "./DialogProps";
import { ActionButton, CancelButton } from "../Basic Components/Buttons";
import { Overlay } from "../Basic Components/Overlay";

const Dialog = ({
  onAction,
  onCancel,
  buttonProps,
  dialogHeader,
  isDialogOpen,
  dialogBody,
  actionButtonColor,
  cancelButtonColor,
  actionButtonText,
  cancelButtonText,
  overlayColor,
  dialogPosition,
  blockScroll,
  closeOnEsc,
  closeOnOverlayClick,
}: DialogProps) => {
  useEffect(() => {
    if (blockScroll && isDialogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isDialogOpen, blockScroll]);

  useEffect(() => {
    const onEscClose = (event: KeyboardEvent): void => {
      if (closeOnEsc && event.key === "Escape") {
        onCancel();
      }
    };
    window.addEventListener("keydown", onEscClose);

    return () => window.removeEventListener("keydown", onEscClose);
  }, [closeOnEsc]);

  const onOverlayClickClose = (): void => {
    if (closeOnOverlayClick) {
      onCancel();
    }
  };

  const dialogWindowLogic = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      {isDialogOpen && (
        <Overlay
          overlayColor={overlayColor}
          dialogPosition={dialogPosition}
          blockScroll={blockScroll}
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          onClick={onOverlayClickClose}
          isDialogOpen={isDialogOpen}
        >
          <AlertDialogWindow onClick={dialogWindowLogic}>
            <AlertDialogHeader dialogHeader={dialogHeader}>
              {dialogHeader}
            </AlertDialogHeader>
            <AlertDialogBody dialogBody={dialogBody}>
              {dialogBody}
            </AlertDialogBody>
            <AlertDialogFooter>
              <CancelButton
                onClick={onCancel}
                buttonProps={buttonProps}
                cancelButtonColor={cancelButtonColor}
              >
                {cancelButtonText}
              </CancelButton>
              <ActionButton
                onClick={onAction}
                buttonProps={buttonProps}
                actionButtonColor={actionButtonColor}
              >
                {actionButtonText}
              </ActionButton>
            </AlertDialogFooter>
          </AlertDialogWindow>
        </Overlay>
      )}
    </>
  );
};

export default Dialog;

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
