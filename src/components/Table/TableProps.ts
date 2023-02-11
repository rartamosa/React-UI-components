export type TableProps = {
  mainHeader: string;
  tableRows: TableRequiredData[];
  tableSubHeaders: SubHeaders[];
};

export type TableRequiredData = TableData & {
  id: string;
  cellName: string;
};

export type TableData = {
  [key: string | number]: string | number | boolean;
};

export type SubHeaders = {
  id: string;
  subHeader: string;
};

// export type AdditionalPropertiesAndValues = {
//   [key: string | number]: string | number | boolean;
// };
