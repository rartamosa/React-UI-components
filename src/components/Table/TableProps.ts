export type TableProps = {
  columnNames: string[];
  tableRows: {}[];
  headerBackGroundColor?: string;
  denseRows?: boolean;
  iconColor?: string;
  borderColor?: string;
  borderWidth?: string;
  allowSorting?: boolean;
  hoverColor?: string;
  columnWidth?: string;
  firstColumnWidth?: string;
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

export type Order = "asc" | "desc";

export const MAIN_LIGHT_COLOR = "#e2e2e2";
export const MAIN_ICON_COLOR = "#b1b1b1";
export const MAIN_DARK_FONT_COLOR = "#0A1929";
