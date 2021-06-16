import { Row } from "../../interfaces/Row";

const Header = ({ row }: { row: Row }) => {
  return (
    <div>
      {row.map((cell) => (
        <div>{cell}</div>
      ))}
    </div>
  );
};

export default Header;
