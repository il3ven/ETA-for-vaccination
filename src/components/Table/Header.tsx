import { IRow } from "../../interfaces/Row";
import Cell from "./Cell";
import { StyledRow } from "./styles";

const Row = ({ row, header }: { row: IRow; header?: Boolean }) => {
  return (
    <StyledRow header={header}>
      {row.map((cell, index) =>
        index === 0 ? <Cell text={cell} firstChild /> : <Cell text={cell} />
      )}
    </StyledRow>
  );
};

export default Row;
