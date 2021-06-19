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
  max-width: 800px;
  padding: 0 1rem;
`;

export const H1 = styled.h1`
  text-align: left;
  font-size: 18pt;
  color: #483b3b;
  padding-bottom: 2rem;
  font-weight: 500;

  @media (min-width: 800px) {
    font-size: 24pt;
    text-align: center;
  }
`;

export const P = styled.p`
  margin: 0 auto;
  max-width: 700px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export const Legend = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
  padding-right: 1rem;

  .text {
    font-size: 9pt;
    max-width: 12rem;
    color: grey;
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
  padding-bottom: 0.8rem;
`;
