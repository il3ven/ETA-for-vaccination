export type ISort = "asc" | "desc" | undefined;
export interface ICell {
  text: string;
  value: string;
  color?: string;
}

export interface IRow extends Array<ICell> {}
