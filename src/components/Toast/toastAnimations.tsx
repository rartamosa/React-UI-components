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

export const determineAnimationType = (animationType?: string): Keyframes => {
  if (animationType === "fadein") {
    return fadein;
  } else if (animationType === "grow") {
    return grow;
  } else if (animationType === "slide") {
    return slide;
  }
  return fadein;
};

export const fadein = keyframes`
0% { opacity: 0.1 }
30% { opacity: 0.4 }
60% { opacity: 0.7 }
100% { opacity: 1 }
`;

export const grow = keyframes`
from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const slide = keyframes`
0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`;
