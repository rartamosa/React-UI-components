import { useState, useEffect } from "react";
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
  TableData,
  Order,
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
  //   mainHeader,
  columnNames,
  tableRows,
  headerBackGroundColor = "#fff",
  denseRows = false,
  iconColor = MAIN_ICON_COLOR,
  footerIconsColor,
  borderColor = MAIN_DARK_FONT_COLOR,
  borderWidth = "1px",
}: TableProps) => {
  const [tableRowsData, setTableRowsData] = useState<(string | number)[][]>([]);
  //   const [tableRowsData, setTableRowsData] = useState<any[][]>([]);

  const [activeSort, setActiveSort] = useState<{
    activeIndex: number;
    order: Order;
  }>({ activeIndex: -1, order: "asc" });

  useEffect(() => {
    setTableRowsData(tableRows.map((item) => createTableData(item)));
  }, []);

  const createColumnNames = (id: string, subHeader: string): ColumnNames => {
    return { id, subHeader };
  };

  const tableColumnNames = columnNames.map((columnName) =>
    createColumnNames(uniqid(), columnName)
  );

  const createTableData = (tableRows: TableData): (string | number)[] => {
    const arrayOfValues = Object.values(tableRows);
    return arrayOfValues;
  };

  const onColumnSelect = (index: number): void => {
    if (activeSort.activeIndex === index) {
      setActiveSort({
        ...activeSort,
        order: activeSort.order === "asc" ? "desc" : "asc",
      });
    } else {
      setActiveSort({
        activeIndex: index,
        order: "asc",
      });
    }
  };

  const sortTableRowsData = (
    a: (string | number)[],
    b: (string | number)[]
  ): number => {
    const { activeIndex, order } = activeSort;

    if (
      typeof a[activeIndex] === "number" &&
      typeof b[activeIndex] === "number"
    ) {
      return order === "asc"
        ? +a[activeIndex] - +b[activeIndex]
        : +b[activeIndex] - +a[activeIndex];
    } else {
      return order === "asc"
        ? a[activeIndex] < b[activeIndex]
          ? -1
          : 1
        : b[activeIndex] < a[activeIndex]
        ? -1
        : 1;
    }
  };

  return (
    <TOverflow borderColor={borderColor} borderWidth={borderWidth}>
      <TContainer>
        <THead
          headerBackGroundColor={headerBackGroundColor}
          columnNames={tableColumnNames}
        >
          {tableColumnNames.map((cell, index) => (
            <ColumnName key={cell.id}>
              <TCell>{cell.subHeader}</TCell>
              <FontAwesomeIcon
                icon={[
                  "fas",
                  `${
                    activeSort.order === "asc" &&
                    activeSort.activeIndex === index
                      ? "arrow-up-wide-short"
                      : "arrow-down-wide-short"
                  }`,
                ]}
                style={{ cursor: "pointer" }}
                color={iconColor}
                onClick={() => onColumnSelect(index)}
              />
            </ColumnName>
          ))}
        </THead>
        <TBody>
          {tableRowsData.sort(sortTableRowsData).map((row) => (
            <TRow key={uniqid()} columnNames={tableColumnNames}>
              {row.map((value) => (
                <TCell key={uniqid()}>{value}</TCell>
              ))}
            </TRow>
          ))}
        </TBody>
        {/* <TFooter>
          <TFooterContainer>
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
          </TFooterContainer>
        </TFooter> */}
      </TContainer>
    </TOverflow>
  );
};

export default Table;

export const TOverflow = styled.div<{
  borderColor?: string;
  borderWidth?: string;
}>`
  max-width: 70%;
  overflow: auto;
  border: ${(props) => props.borderWidth} solid ${(props) => props.borderColor};
  border-radius: 8px;
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
  font-size: 14px;
  position: relative;
`;

export const TFooterContainer = styled.div`
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 40px;
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
