import { StyledCell } from "./styles";

const Cell = ({
  data,
  firstChild,
}: {
  data: { text: string; color?: string };
  firstChild?: Boolean;
}) => {
  return (
    <StyledCell firstChild={firstChild} textColor={data.color}>
      {data.text}
    </StyledCell>
  );
};

export default Cell;
