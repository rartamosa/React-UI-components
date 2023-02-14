import { useState, useEffect } from "react";
import { keyframes, Keyframes } from "styled-components";

export const useDelayUnmount = (
  isMounted: boolean,
  delayTime: number
): boolean => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (isMounted && !shouldRender) {
      setShouldRender(true);
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime);
    }
    return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
};

export const determineAnimationType = (
  animationType?: string,
  toastsPosition?: string,
  isUnmounting?: boolean
): Keyframes => {
  if (!isUnmounting) {
    if (animationType === "fade") {
      return fadein;
    } else if (animationType === "grow") {
      return growin;
    } else if (
      (animationType === "slide" && toastsPosition === "bottom-left") ||
      toastsPosition === "bottom-center" ||
      toastsPosition === "bottom-right"
    ) {
      return slidein;
    } else if (
      (animationType === "slide" && toastsPosition === "top-left") ||
      toastsPosition === "top-center" ||
      toastsPosition === "top-right"
    ) {
      return slideinTop;
    }
  } else {
    if (animationType === "fade") {
      return fadeout;
    } else if (animationType === "grow") {
      return growout;
    } else if (
      (animationType === "slide" && toastsPosition === "top-left") ||
      toastsPosition === "top-center" ||
      toastsPosition === "top-right"
    ) {
      return slideoutTop;
    } else if (
      (animationType === "slide" && toastsPosition === "bottom-left") ||
      toastsPosition === "bottom-center" ||
      toastsPosition === "bottom-right"
    ) {
      return slideout;
    }
  }
  return fadein;
};

export const fadein = keyframes`
0% { opacity: 0.1 }
30% { opacity: 0.4 }
60% { opacity: 0.7 }
100% { opacity: 1 }
`;

export const fadeout = keyframes`
0% { opacity: 1 }
30% { opacity: 0.7 }
60% { opacity: 0.4 }
100% { opacity: 0.1 }
`;

export const growout = keyframes`
from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`;

export const growin = keyframes`
from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const slidein = keyframes`
0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const slideout = keyframes`
0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

export const slideinTop = keyframes`
from {
  transform: translateY(-100%);
}
to {
  transform: translateY(0%);
}
`;

export const slideoutTop = keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(-100%);
}
`;
