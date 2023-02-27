import { useState, useEffect, useCallback } from "react";
// @ts-ignore
import uniqid from "uniqid";

import { SingleToastProps, ToastToAdd } from "./ToastProps";

const useToast = (
  timeout: number
): [
  SingleToastProps[],
  (toastToAdd: ToastToAdd) => void,
  (id: string) => void
] => {
  const [toastList, setToastList] = useState<SingleToastProps[]>([]);

  const onToastAdd = (toastToAdd: ToastToAdd): void => {
    setToastList([
      ...toastList,
      {
        ...toastToAdd,
        id: uniqid(),
      },
    ]);
  };

  const onToastRemove = useCallback(
    (id: string): void => {
      setToastList(
        toastList.map((item) => {
          if (item.id === id) {
            return { ...item, isUnmounting: true };
          } else {
            return item;
          }
        })
      );
      setTimeout(() => {
        const updatedToastList = toastList.filter((toast) => toast.id !== id);
        setToastList(updatedToastList);
      }, 200);
    },
    [toastList]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (toastList.length) {
        onToastRemove(toastList[0].id);
      }
    }, timeout);
    return () => clearInterval(intervalId);
  }, [toastList, timeout, onToastRemove]);

  return [toastList, onToastAdd, onToastRemove];
};

export default useToast;
