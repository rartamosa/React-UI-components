import {
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import { ToastProps, toastFontColorHex } from "./ToastProps";

import {
  SingleToast,
  ToastDescriptionContainer,
  ToastHeader,
  ToastCopy,
  ToastContainerDiv,
  HeaderContainer,
  ToastCloseButton,
  ToastIcon,
} from "./toastStyles";

library.add(
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo,
  faCircleXmark
);

const Toast = ({
  toastList,
  animationType,
  onToastRemove,
  toastsPosition,
}: ToastProps) => {
  return (
    <ToastContainerDiv toastsPosition={toastsPosition}>
      {toastList.map(
        ({
          id,
          toastHeader,
          toastDescription,
          toastBacgroundColor,
          toastFontColor = toastFontColorHex,
          toastIcon,
          iconColor,
          typeOfToast,
          size,
          boxShadow,
          isUnmounting,
        }) => (
          <SingleToast
            key={id}
            toastBacgroundColor={toastBacgroundColor}
            toastFontColor={toastFontColor}
            typeOfToast={typeOfToast}
            size={size}
            boxShadow={boxShadow}
            animationType={animationType}
            isUnmounting={isUnmounting}
            toastsPosition={toastsPosition}
          >
            {typeOfToast === "success" ||
              (typeOfToast === undefined && (
                <ToastIcon
                  icon={
                    toastIcon ? ["fas", toastIcon] : ["fas", "circle-check"]
                  }
                  color={iconColor}
                />
              ))}

            {typeOfToast === "error" && (
              <ToastIcon
                icon={
                  toastIcon ? ["fas", toastIcon] : ["fas", "circle-exclamation"]
                }
                color={iconColor}
              />
            )}

            {typeOfToast === "warning" && (
              <ToastIcon
                icon={
                  toastIcon
                    ? ["fas", toastIcon]
                    : ["fas", "triangle-exclamation"]
                }
                color={iconColor}
              />
            )}

            {typeOfToast === "info" && (
              <ToastIcon
                icon={toastIcon ? ["fas", toastIcon] : ["fas", "circle-info"]}
                color={iconColor}
              />
            )}

            <ToastDescriptionContainer>
              <HeaderContainer>
                <ToastHeader toastHeader={toastHeader} size={size}>
                  {toastHeader}
                </ToastHeader>

                <ToastCloseButton
                  icon={["fas", "circle-xmark"]}
                  onClick={() => onToastRemove(id)}
                  style={{ cursor: "pointer", alignSelf: "baseline" }}
                  iconSize={size}
                />
              </HeaderContainer>

              {toastDescription && (
                <ToastCopy toastDescription={toastDescription} size={size}>
                  {toastDescription}
                </ToastCopy>
              )}
            </ToastDescriptionContainer>
          </SingleToast>
        )
      )}
    </ToastContainerDiv>
  );
};

export default Toast;
