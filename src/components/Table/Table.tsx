import Row from "./Row";
import { IRow } from "../../interfaces/Row";
import { StyledTable } from "./styles";

const Table = ({
  heading,
  rows,
  handleSort,
}: {
  heading: IRow;
  rows: Array<IRow>;
  handleSort: (index: number) => void;
}) => {
  return (
    <StyledTable cols={heading.length.toString()}>
      <Row row={heading} header />
      {rows.map((row) => (
        <Row row={row} />
      ))}
    </StyledTable>
  );
};

export default Table;
