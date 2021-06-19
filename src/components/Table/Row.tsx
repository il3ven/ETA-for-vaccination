import { useState } from "react";
import { IRow, ISort } from "../../interfaces/Row";
import Cell from "./Cell";
import { StyledRow } from "./styles";

const Row = ({
  row,
  header,
  handleSort,
  onClick,
}: {
  row: IRow;
  header?: Boolean;
  handleSort?: (heading: string, sort: ISort) => void;
  onClick?: (code: string) => void;
}) => {
  const [sort, setSort] = useState<ISort>();
  const [sortIndex, setSortIndex] = useState<Number | undefined>();

  const flipSort = (sort: ISort) => (sort === "asc" ? "desc" : "asc");

  const handleClick = (text: string, index: number) => {
    if (handleSort) {
      const newSort = index === sortIndex ? flipSort(sort) : "asc";
      handleSort(text, newSort);
      setSort(newSort);
      setSortIndex(index);
    }
  };

  console.log(!!onClick);

  return (
    <StyledRow
      header={header}
      onClick={() => {
        onClick?.(row[0].value);
      }}
      showCursor={!!onClick}
    >
      {row.map((cell, index) => {
        const props = {
          data: cell,
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
