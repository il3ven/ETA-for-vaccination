import Row from "./Header";
import { IRow } from "../../interfaces/Row";
import { StyledTable } from "./styles";

const Table = ({ heading, rows }: { heading: IRow; rows: Array<IRow> }) => {
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
