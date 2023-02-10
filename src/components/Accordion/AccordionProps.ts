import { IconName } from "@fortawesome/free-solid-svg-icons";

export type AccordionProps = {
  accordionBody: AccordionData[];
  show?: "single" | "many";
  customIconClosed?: IconName;
  customIconExpanded?: IconName;
  iconColor?: string;
  accordionBodyHeight?: string;
  scroll?: boolean;
  containerBackgroundColor?: string;
  accordionBackgroundColor?: string;
  defaultIndex?: 0 | number;
  defaultIndexes?: number[];
};

export type AccordionData = {
  id: string;
  children: () => JSX.Element | JSX.Element[];
  title: string;
  subtitle?: string;
  disabled?: boolean;
};

export const MAIN_LIGHT_COLOR = "#e2e2e2";
export const SECONDARY_LIGHT_COLOR = "#bbb";
export const MAIN_DARK_FONT_COLOR = "#0A1929";
