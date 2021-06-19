import styled from "styled-components";

export const StyledTable = styled.div<{ cols: string }>`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: repeat(${({ cols }) => cols}, fit-content(25%));
  /* gap: 0.2rem; */
`;

export const StyledIconDiv = styled.div`
  position: absolute;
  right: 0;
  top: 10%;
  color: #4a4e60;
`;

export const StyledCell = styled.div<{
  firstChild?: Boolean;
  textColor?: string;
}>`
  padding: 0.5rem;
  padding-left: 0.4rem;
  padding-right: 0.7rem;
  transition: color 0.3s ease-in-out;
  color: ${({ textColor }) => textColor || "#5b5c68"};
  font-size: 11pt;
  position: relative;

  &:first-child {
    position: sticky;
    left: 0;
    color: #000000;
    background-color: #fff;
    z-index: 3;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;

    @media (max-width: 600px) {
      border-right: 1px solid #97979729;
    }
  }

  &:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
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
      cursor: pointer;

      &:hover {
        background-color: #f4f4f4;
      }
    `}
  }
`;
