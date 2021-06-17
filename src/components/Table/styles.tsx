import styled from "styled-components";

export const StyledTable = styled.div<{ cols: string }>`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(${({ cols }) => cols}, fit-content(25%));
  gap: 0.2rem;
`;

export const StyledCell = styled.div<{ firstChild?: Boolean }>`
  background-color: lightgrey;
  padding: 0.5rem;
  border-radius: 0.2rem;
`;

export const StyledRow = styled.div<{ header?: Boolean }>`
  display: contents;

  ${StyledCell} {
    ${(props) => props.header && "background-color: darkgrey;"}
  }
`;
