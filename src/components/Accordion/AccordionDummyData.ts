import React from "react";
// @ts-ignore
import uniqid from "uniqid";

import { AccordionData } from "./AccordionProps";
import DummyComponent from "./DummyComponent";

const AccordionDummyData: AccordionData[] = [
  {
    id: uniqid(),
    children: () => DummyComponent,
    disabled: false,
  },
  {
    id: uniqid(),
    children: DummyComponent,
    disabled: false,
  },
  {
    id: uniqid(),
    children: DummyComponent,
    disabled: true,
  },
];

export default AccordionDummyData;
