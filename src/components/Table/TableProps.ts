export type TableProps = {
  // mainHeader: string;
  // tableRows: TableRequiredData[];
  columnNames: string[];
  tableRows: {}[];
  headerBackGroundColor?: string;
  denseRows?: boolean;
  iconColor?: string;
  footerIconsColor?: string;
  borderColor?: string;
  borderWidth?: string;
  stickyHeader?: boolean; //TODO
  sortingApplied?: boolean; //TODO
};

export type TableRequiredData = TableData & {
  id: string;
};

export type TableData = {
  [key: string | number]: string | number;
};

export type ColumnNames = {
  id: string;
  subHeader: string;
};

export type Order = "asc" | "desc"; // TODO

export const MAIN_LIGHT_COLOR = "#e2e2e2";
export const MAIN_ICON_COLOR = "#b1b1b1";
export const MAIN_DARK_FONT_COLOR = "#0A1929";
