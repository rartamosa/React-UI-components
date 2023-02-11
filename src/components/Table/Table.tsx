import styled from "styled-components";
// @ts-ignore
import uniqid from "uniqid";

import {
  fas,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  TableProps,
  ColumnNames,
  MAIN_LIGHT_COLOR,
  MAIN_ICON_COLOR,
  MAIN_DARK_FONT_COLOR,
} from "./TableProps";

library.add(
  fas,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faAnglesLeft,
  faAngleLeft,
  faAngleRight,
  faAnglesRight
);

const Table = ({
  mainHeader,
  tableRows,
  columnNames,
  tableRows2,
  headerBackGroundColor = "#fff",
  denseRows = false,
  iconColor = MAIN_ICON_COLOR,
  footerIconsColor,
  borderColor = MAIN_DARK_FONT_COLOR,
  borderWidth = "1px",
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
      <TContainer borderColor={borderColor} borderWidth={borderWidth}>
        <THead
          headerBackGroundColor={headerBackGroundColor}
          columnNames={tableColumnNames}
        >
          <TCell style={{ textAlign: "unset" }}>{mainHeader}</TCell>
          {tableColumnNames.map((cell) => (
            <ColumnName>
              <TCell key={cell.id}>{cell.subHeader}</TCell>
              <FontAwesomeIcon
                icon={["fas", "arrow-up-wide-short"]}
                style={{ cursor: "pointer" }}
                color={iconColor}
              />
            </ColumnName>
          ))}
        </THead>
        <TBody>
          {tableRows.map((row) => (
            <TRow
              key={row.id}
              columnNames={tableColumnNames}
              denseRows={denseRows}
            >
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
        <TFooter>
          <FooterCell>
            <span>Rows per page:</span>
            <RowsSelect>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="all">All</option>
            </RowsSelect>
          </FooterCell>
          <FooterCell>1–5 of 13</FooterCell>
          <FooterCell>
            <FontAwesomeIcon
              icon={["fas", "angles-left"]}
              style={{ cursor: "pointer" }}
              size="lg"
              color={footerIconsColor ? footerIconsColor : iconColor}
            />
            <FontAwesomeIcon
              icon={["fas", "angle-left"]}
              style={{ cursor: "pointer" }}
              size="lg"
              color={footerIconsColor ? footerIconsColor : iconColor}
            />
            <FontAwesomeIcon
              icon={["fas", "angle-right"]}
              style={{ cursor: "pointer" }}
              size="lg"
              color={footerIconsColor ? footerIconsColor : iconColor}
            />
            <FontAwesomeIcon
              icon={["fas", "angles-right"]}
              style={{ cursor: "pointer" }}
              size="lg"
              color={footerIconsColor ? footerIconsColor : iconColor}
            />
          </FooterCell>
        </TFooter>
      </TContainer>
    </>
  );
};

export default Table;

export const TContainer = styled.div<{
  borderColor?: string;
  borderWidth?: string;
}>`
  border: ${(props) => props.borderWidth} solid ${(props) => props.borderColor};
  padding: 10px;
  cursor: default;
  max-width: 70%;
  border-radius: 8px;
`;

export const THead = styled.div<{
  headerBackGroundColor?: string;
  columnNames: ColumnNames[];
}>`
  display: grid;
  grid-template-columns: 2fr repeat(
      ${(props) => props.columnNames.length},
      minmax(15px, 1fr)
    );
  gap: 15px;
  padding: 6px 0;
  background-color: ${(props) => props.headerBackGroundColor};
`;

export const TBody = styled.div`
  overflow-x: auto;
`;

export const TRow = styled.div<{
  columnNames: ColumnNames[];
  denseRows?: boolean;
}>`
  display: grid;
  grid-template-columns: 2fr repeat(
      ${(props) => props.columnNames.length},
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
`;

export const ColumnName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`;

export const TCell = styled.div`
  text-align: right;
`;

export const TFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 40px;
  font-size: 14px;
`;

export const FooterCell = styled.div`
  display: flex;
  gap: 10px;
`;

export const RowsSelect = styled.select`
  font-family: inherit;
  border: none;
  cursor: pointer;
`;
