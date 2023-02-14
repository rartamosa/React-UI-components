import styled from "styled-components";
import { ColumnNames, MAIN_LIGHT_COLOR } from "./TableProps";

export const TOverflow = styled.div<{
  borderColor?: string;
  borderWidth?: string;
}>`
  max-width: 70%;
  overflow: auto;
  border: ${(props) => props.borderWidth} solid ${(props) => props.borderColor};
  border-radius: 8px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const TContainer = styled.div`
  padding: 10px;
  cursor: default;
  width: max-content;
`;

export const THead = styled.div<{
  headerBackGroundColor?: string;
  columnNames: ColumnNames[];
}>`
  display: grid;
  grid-template-columns: 2fr repeat(
      ${(props) => props.columnNames.length - 1},
      minmax(15px, 1fr)
    );
  gap: 15px;
  padding: 6px 0;
  background-color: ${(props) => props.headerBackGroundColor};
  font-weight: 700;
  @media (max-width: 768px) {
    grid-template-columns: 1fr repeat(
        ${(props) => props.columnNames.length - 1},
        minmax(15px, 1fr)
      );
    gap: 0;
    font-size: 14px;
  }
`;

export const TBody = styled.div`
  overflow-x: auto;
  height: 200px;
`;

export const TRow = styled.div<{
  columnNames: ColumnNames[];
  denseRows?: boolean;
}>`
  display: grid;
  grid-template-columns: 2fr repeat(
      ${(props) => props.columnNames.length - 1},
      minmax(15px, 1fr)
    );
  gap: 15px;
  padding: ${(props) => (props.denseRows ? "0" : "6px 0")};
  border-bottom: 1px solid #333;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background-color: ${MAIN_LIGHT_COLOR};
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr repeat(
        ${(props) => props.columnNames.length - 1},
        minmax(15px, 1fr)
      );
    gap: 0;
    font-size: 13px;
  }
`;

export const ColumnName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  &:first-of-type {
    justify-self: flex-start;
  }
`;

export const TCell = styled.div`
  text-align: right;
  &:first-of-type {
    text-align: left;
  }
`;
