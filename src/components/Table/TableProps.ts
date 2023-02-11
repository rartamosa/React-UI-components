export type TableProps = {
  mainHeader: string;
  tableRows: TableRequiredData[];
  tableSubHeaders: SubHeaders[];
};

export type TableRequiredData = TableData & {
  id: string;
  name: string;
};

export type TableData = {
  [key: string | number]: string | number | boolean;
};

export type SubHeaders = {
  id: string;
  subHeader: string;
  //   [key: string | number]: string | number | boolean;
};
