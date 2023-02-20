import { useState, useEffect } from "react";
// @ts-ignore
import uniqid from "uniqid";

import {
  fas,
  faArrowUpWideShort,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  TableProps,
  ColumnNames,
  MAIN_ICON_COLOR,
  MAIN_DARK_FONT_COLOR,
  MAIN_LIGHT_COLOR,
  TableData,
  Order,
} from "./TableProps";

import {
  TOverflow,
  TContainer,
  THead,
  TBody,
  TRow,
  ColumnName,
  TCell,
} from "./tableStyles";

library.add(fas, faArrowUpWideShort, faArrowDownWideShort);

const Table = ({
  columnNames,
  tableRows,
  headerBackGroundColor = "#fff",
  denseRows = false,
  iconColor = MAIN_ICON_COLOR,
  borderColor = MAIN_DARK_FONT_COLOR,
  borderWidth = "1px",
  allowSorting = true,
  hoverColor = MAIN_LIGHT_COLOR,
  columnWidth = "100px",
  firstColumnWidth = "200px",
}: TableProps) => {
  const [tableRowsData, setTableRowsData] = useState<(string | number)[][]>([]);

  const [activeSort, setActiveSort] = useState<{
    activeIndex: number;
    order: Order;
  }>({ activeIndex: -1, order: "asc" });

  useEffect(() => {
    setTableRowsData(tableRows.map((item) => createTableData(item)));
  }, [tableRows]);

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
          columnWidth={columnWidth}
          firstColumnWidth={firstColumnWidth}
        >
          {tableColumnNames.map((cell, index) => (
            <ColumnName key={cell.id}>
              <TCell>{cell.subHeader}</TCell>
              {allowSorting && (
                <FontAwesomeIcon
                  icon={[
                    "fas",
                    `${
                      activeSort.order === "asc" &&
                      activeSort.activeIndex === index
                        ? "arrow-down-wide-short"
                        : "arrow-up-wide-short"
                    }`,
                  ]}
                  style={{ cursor: "pointer" }}
                  color={iconColor}
                  onClick={() => onColumnSelect(index)}
                />
              )}
            </ColumnName>
          ))}
        </THead>
        <TBody>
          {tableRowsData.sort(sortTableRowsData).map((row) => (
            <TRow
              key={uniqid()}
              columnNames={tableColumnNames}
              denseRows={denseRows}
              hoverColor={hoverColor}
              columnWidth={columnWidth}
              firstColumnWidth={firstColumnWidth}
            >
              {row.map((value) => (
                <TCell key={uniqid()}>{value}</TCell>
              ))}
            </TRow>
          ))}
        </TBody>
      </TContainer>
    </TOverflow>
  );
};

export default Table;
