import React, { useEffect } from "react";

import { DialogProps } from "./DialogProps";
import { ActionButton, CancelButton } from "../Basic Components/Buttons";
import { Overlay } from "../Basic Components/Overlay";
import {
  AlertDialogWindow,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "./dialogStyles";

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
  }, [closeOnEsc, onCancel]);

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
