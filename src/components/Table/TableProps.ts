export type TableProps = {
  mainHeader: string;
  tableRows: TableRequiredData[];
  columnNames: string[];
  tableRows2: {}[];
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

// export type AdditionalPropertiesAndValues = {
//   [key: string | number]: string | number | boolean;
// };
