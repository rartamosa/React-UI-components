import React, { ReactNode } from "react";
import { JsxEmit } from "typescript";

export type AccordionProps = {
  accordionBody: AccordionData[];
};

export type AccordionData = {
  id: string;
  children: ReactNode | JSX.Element;
  disabled: boolean;
};
