import { StyledCell } from "./styles";

const Cell = ({ text, firstChild }: { text: string; firstChild?: Boolean }) => {
  return <StyledCell firstChild={firstChild}>{text}</StyledCell>;
};

export default Cell;
