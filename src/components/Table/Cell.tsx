import { useState, forwardRef, ForwardedRef } from "react";
import { MouseEventHandler } from "react";
import { ISort } from "../../interfaces/Row";
import { StyledCell, StyledIconDiv } from "./styles";

type Props = {
  data: { text: string; color?: string };
  firstChild?: Boolean;
  sort?: ISort;
  header?: Boolean;
  onClick?: (text: string) => void;
};

const Cell = ({ data, firstChild, sort, header, onClick }: Props) => {
  const handleClick: MouseEventHandler = (e) => {
    onClick?.(data.text);
  };

  return (
    <StyledCell
      firstChild={firstChild}
      textColor={data.color}
      role="button"
      onClick={handleClick}
    >
      <span>{data.text}</span>
      <StyledIconDiv>
        {header && sort && (sort === "asc" ? " ↑" : " ↓")}
      </StyledIconDiv>
    </StyledCell>
  );
};

export default Cell;
