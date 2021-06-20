import Row from "./Row";
import { IRow, ISort } from "../../interfaces/Row";
import { StyledTable } from "./styles";
import { useHistory } from "react-router-dom";

const Table = ({
  heading,
  rows,
  handleSort,
  allowClick,
}: {
  heading: IRow;
  rows: IRow[];
  handleSort: (heading: string, sort: ISort) => void;
  allowClick: Boolean;
}) => {
  let history = useHistory();

  const handleClick = (code: string) => {
    history.push(`/${code}`);
  };

  return (
    <StyledTable cols={heading.length.toString()}>
      <Row row={heading} header handleSort={handleSort} />
      {rows.map((row, index) =>
        index === 0 ? (
          <Row row={row} key={row[0].value} />
        ) : (
          <Row
            row={row}
            key={row[0].value}
            {...(allowClick && {
              onClick: handleClick,
            })}
          />
        )
      )}
    </StyledTable>
  );
};

export default Table;
