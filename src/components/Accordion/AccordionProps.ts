import React, { ReactNode } from "react";

export type AccordionProps = {
  accordionBody: AccordionData[];
};

export type AccordionData = {
  id: string;
  children: () => JSX.Element;
  disabled: boolean;
};
