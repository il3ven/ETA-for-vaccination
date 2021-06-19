type HeaderProps = {
  target: string;
  handleDate: () => void;
};

export const Header = ({ target, handleDate }: HeaderProps) => {
  return (
    <head>
      <input type="date" value={target} onChange={handleDate} />
    </head>
  );
};
