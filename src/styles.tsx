import styled from "styled-components";

export const TableWrapper = styled.div`
  margin: 0 auto;
  overflow: auto;

  @media (min-width: 800px) {
    max-width: 700px;
  }
`;

export const Header = styled.header`
  margin: 0 auto;
  max-width: 900px;
  padding: 0 1rem;
`;

export const H1 = styled.h1`
  font-size: 18pt;
  color: #483b3b;
  padding-bottom: 2rem;
  font-weight: 500;

  @media (min-width: 800px) {
    font-size: 24pt;
  }
`;

export const P = styled.div`
  max-width: 700px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 1rem;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  padding-right: 1rem;
  padding-bottom: 1rem;

  .text {
    font-size: 9pt;
    max-width: 12rem;
    color: #808080;
  }
`;

export const Circle = styled.div<{ circleColor: string }>`
  display: inline-block;
  background: ${({ circleColor }) => circleColor};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const DateWrapper = styled.div`
  padding-bottom: 1rem;
`;
