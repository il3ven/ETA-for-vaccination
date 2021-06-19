import Row from "./Row";
import { IRow, ISort } from "../../interfaces/Row";
import { StyledTable } from "./styles";

const Table = ({
  heading,
  rows,
  handleSort,
}: {
  heading: IRow;
  rows: Array<IRow>;
  handleSort: (heading: string, sort: ISort) => void;
}) => {
  return (
    <StyledTable cols={heading.length.toString()}>
      <Row row={heading} header handleSort={handleSort} />
      {rows.map((row, index) => (
        <Row row={row} key={index} />
      ))}
    </StyledTable>
  );
};

export default Table;
