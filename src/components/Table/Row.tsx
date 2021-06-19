import { useState, MouseEventHandler, createElement } from "react";
import { IRow, ISort } from "../../interfaces/Row";
import Cell from "./Cell";
import { StyledRow } from "./styles";

const Row = ({
  row,
  header,
  handleSort,
}: {
  row: IRow;
  header?: Boolean;
  handleSort?: (heading: string, sort: ISort) => void;
}) => {
  const [sort, setSort] = useState<ISort>();
  const [sortIndex, setSortIndex] = useState<Number | undefined>();

  const flipSort = (sort: ISort) => (sort === "asc" ? "desc" : "asc");

  const handleClick = (text: string, index: number) => {
    if (handleSort) {
      handleSort(text, sort);
      setSort(index === sortIndex ? flipSort(sort) : "asc");
      setSortIndex(index);
    }
  };

  return (
    <StyledRow header={header}>
      {row.map((cell, index) => {
        const props = {
          data: cell,
          header: header,
          key: index,
          onClick: (text: string) => handleClick(text, index),
          ...(index === 0 && { firstChild: true }),
          ...(sortIndex === index && { sort }),
        };

        return <Cell {...props} />;
      })}
    </StyledRow>
  );
};

export default Row;
