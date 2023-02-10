// @ts-ignore
import uniqid from "uniqid";

import { AccordionData } from "./AccordionProps";
import DummyComponent from "./DummyComponent";

const accordionDummyData: AccordionData[] = [
  {
    id: uniqid(),
    children: DummyComponent,
    title: "Example title1",
    subtitle: "Example subtitle",
    disabled: false,
  },
  {
    id: uniqid(),
    children: DummyComponent,
    title: "Example title2",
    // disabled: false,
  },
  {
    id: uniqid(),
    children: DummyComponent,
    title: "Example title3",
    disabled: true,
  },
];

export default accordionDummyData;
