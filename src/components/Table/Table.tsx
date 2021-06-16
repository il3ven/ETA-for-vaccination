import Header from "./Header";
import { Row } from "../../interfaces/Row";

const Table = ({ rows }: { rows: Array<Row> }) => {
  return (
    <div>
      {rows.map((row) => (
        <Header row={row} />
      ))}
    </div>
  );
};

export default Table;
