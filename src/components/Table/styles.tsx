import styled from "styled-components";

export const StyledTable = styled.div<{ cols: string }>`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(${({ cols }) => cols}, fit-content(25%));
  /* gap: 0.2rem; */
`;

export const StyledCell = styled.div<{
  firstChild?: Boolean;
  textColor?: string;
}>`
  /* background-color: #ebebeb; */
  padding: 0.5rem;
  /* border-radius: 0.2rem; */
  transition: color 0.3s ease-in-out;
  color: ${({ textColor }) => textColor || "#5b5c68"};
  font-size: 11pt;

  &:first-child {
    position: sticky;
    left: 0;
    color: #000000;
    background-color: #fff;

    @media (max-width: 540px) {
      /* box-shadow: 3px 0 10px #2b2b2b28; */
      border-right: 1px solid #97979729;
    }
  }
`;

export const StyledRow = styled.div<{ header?: Boolean }>`
  display: contents;

  ${StyledCell} {
    ${(props) =>
      props.header &&
      `
      background-color: #f9f9fb;
      color: #787a8a;
      display: flex;
      align-items: center;
    `}
  }
`;
