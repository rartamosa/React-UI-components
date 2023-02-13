import { useState, useEffect } from "react";
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (toastList.length) {
        onToastRemove(toastList[0].id);
      }
    }, timeout);
    return () => clearInterval(intervalId);
  }, [toastList, timeout]);

  const onToastAdd = (toastToAdd: ToastToAdd): void => {
    setToastList([
      ...toastList,
      {
        ...toastToAdd,
        id: uniqid(),
      },
    ]);
  };

  const onToastRemove = (id: string): void => {
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
  };

  return [toastList, onToastAdd, onToastRemove];
};

export default useToast;
