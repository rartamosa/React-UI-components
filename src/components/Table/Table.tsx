import styled from "styled-components";

import { TableProps, SubHeaders } from "./TableProps";

const Table = ({ mainHeader, tableRows, tableSubHeaders }: TableProps) => {
  return (
    <>
      <TContainer>
        <THead>
          <TRow tableSubHeaders={tableSubHeaders}>
            <TCell style={{ textAlign: "unset" }}>{mainHeader}</TCell>
            {tableSubHeaders.map((cell) => (
              <TCell key={cell.id}>{cell.subHeader}</TCell>
            ))}
          </TRow>
        </THead>
        <TBody>
          {tableRows.map((row) => (
            <TRow key={row.id} tableSubHeaders={tableSubHeaders}>
              <TCell style={{ textAlign: "unset" }}>{row.name}</TCell>
              <TCell>{row.calories}</TCell>
              <TCell>{row.fat}</TCell>
              <TCell>{row.carbs}</TCell>
              <TCell>{row.protein}</TCell>
            </TRow>
          ))}
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
  tableSubHeaders: SubHeaders[];
}>`
  display: grid;
  grid-template-columns: 3fr repeat(
      ${(props) => props.tableSubHeaders.length},
      1fr
    );
  gap: 15px;
`;

export const TCell = styled.div`
  text-align: right;
`;
