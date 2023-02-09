export type AccordionProps = {
  accordionBody: AccordionData[];
  show?: "single" | "many";
  customIcon?: string;
  iconColor?: string;
};

export type AccordionData = {
  id: string;
  children: () => JSX.Element | JSX.Element[];
  title: string;
  disabled?: boolean;
  //   index?: number;
};

export const MAIN_LIGHT_COLOR = "#e2e2e2";
export const SECONDARY_LIGHT_COLOR = "#bbb";
export const MAIN_DARK_FONT_COLOR = "#0A1929";
