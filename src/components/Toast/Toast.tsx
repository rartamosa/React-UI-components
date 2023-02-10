import {
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastProps, toastFontColorHex } from "./ToastProps";

import BasicCloseButton from "../Basic Components/BasicCloseButton";
import {
  SingleToast,
  ToastDescriptionContainer,
  ToastHeader,
  ToastCopy,
  ToastContainerDiv,
} from "./toastStyles";

library.add(
  fas,
  faCircleCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faCircleInfo
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
          typeOfToast,
          size,
          boxShadow,
        }) => (
          <SingleToast
            key={id}
            toastBacgroundColor={toastBacgroundColor}
            toastFontColor={toastFontColor}
            typeOfToast={typeOfToast}
            size={size}
            boxShadow={boxShadow}
            animationType={animationType}
          >
            {typeOfToast === "success" ||
              (typeOfToast === undefined && (
                <FontAwesomeIcon
                  icon={
                    toastIcon ? ["fas", toastIcon] : ["fas", "circle-check"]
                  }
                  size="xl"
                />
              ))}

            {typeOfToast === "error" && (
              <FontAwesomeIcon
                icon={
                  toastIcon ? ["fas", toastIcon] : ["fas", "circle-exclamation"]
                }
                size="xl"
              />
            )}

            {typeOfToast === "warning" && (
              <FontAwesomeIcon
                icon={
                  toastIcon
                    ? ["fas", toastIcon]
                    : ["fas", "triangle-exclamation"]
                }
                size="xl"
              />
            )}

            {typeOfToast === "info" && (
              <FontAwesomeIcon
                icon={toastIcon ? ["fas", toastIcon] : ["fas", "circle-info"]}
                size="xl"
              />
            )}

            <ToastDescriptionContainer>
              <BasicCloseButton
                onClick={() => onToastRemove(id)}
                style={{
                  position: "absolute",
                  right: "0",
                  top: "0",
                  paddingRight: "7px",
                }}
              >
                &times;
              </BasicCloseButton>
              <ToastHeader toastHeader={toastHeader} size={size}>
                {toastHeader}
              </ToastHeader>
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
