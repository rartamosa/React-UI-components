import styled from "styled-components";
// @ts-ignore
import uniqid from "uniqid";

import { TableProps, ColumnNames } from "./TableProps";

const Table = ({
  mainHeader,
  tableRows,
  columnNames,
  tableRows2,
}: TableProps) => {
  const createColumnNames2 = (id: string, subHeader: string): ColumnNames => {
    return { id, subHeader };
  };

  const tableColumnNames = columnNames.map((columnName) =>
    createColumnNames2(uniqid(), columnName)
  );

  //   console.log(tableRows2);

  const createTableData = (tableRows2: {}[]) => {
    const arrayOfValues = tableRows2.map((obj) => Object.values(obj));
    // console.log(arrayOfValues);
    return { arrayOfValues };
  };

  const tableRowsData = tableRows2.map((item) => createTableData([item]));
  console.log(tableRowsData.map((data) => data.arrayOfValues));

  return (
    <>
      <TContainer>
        <THead>
          <TRow columnNames={tableColumnNames}>
            <TCell style={{ textAlign: "unset" }}>{mainHeader}</TCell>
            {tableColumnNames.map((cell) => (
              <TCell key={cell.id}>{cell.subHeader}</TCell>
            ))}
          </TRow>
        </THead>
        <TBody>
          {tableRows.map((row) => (
            <TRow key={row.id} columnNames={tableColumnNames}>
              <TCell style={{ textAlign: "unset" }}>{row.cellName}</TCell>
              {Object.entries(row)
                .filter((cell) => cell[0] !== "id")
                .filter((cell) => cell[0] !== "cellName")
                .map((cell) => (
                  <TCell key={uniqid()}>{cell[1]}</TCell>
                ))}
            </TRow>
          ))}
          {/* {tableRowsData.map((row) => (
            <TRow key={uniqid()} columnNames={tableColumnNames}>
              {row.arrayOfValues.map((value) => (
                <TCell key={uniqid()}>{value}</TCell>
              ))}
            </TRow>
          ))} */}
        </TBody>
      </TContainer>
    </>
  );
};

export default Table;

export const TContainer = styled.div`
  border: 2px solid black;
  padding: 10px;
`;

export const THead = styled.div`
  background-color: pink;
`;

export const TBody = styled.div``;

export const TRow = styled.div<{
  columnNames: ColumnNames[];
}>`
  display: grid;
  grid-template-columns: 3fr repeat(${(props) => props.columnNames.length}, 1fr);
  gap: 15px;
`;

export const TCell = styled.div`
  text-align: right;
`;
