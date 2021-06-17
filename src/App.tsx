import { IRow } from "./interfaces/Row";
import Table from "./components/Table/Table";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { STATE_NAMES } from "./constant";
import { TableWrapper } from "./styles";

const heading = [
  "State",
  "ETA",
  "Average Speed",
  "Percentage of Population Vaccinated with Dose 1",
  "Percentage of Population Vaccinated with Dose 2",
];
// const rows: IRow[] = [["Delhi", "50%"]];

const getETA = (vaccinated1: string, vaccinated2: string) => {
  return Math.round((Number(vaccinated1) + Number(vaccinated2)) / 7).toString();
};

const getAverageSpeed = (vaccinated1: string, vaccinated2: string) => {
  return `${Math.round(Number(vaccinated1) + Number(vaccinated2) / 7)} per day`;
};

const getRow = (resp: any, stateCode: string): IRow => {
  return [
    STATE_NAMES[stateCode],
    getETA(
      resp[stateCode]?.delta7?.vaccinated1,
      resp[stateCode]?.delta7?.vaccinated2
    ),
    getAverageSpeed(
      resp[stateCode]?.delta7?.vaccinated1,
      resp[stateCode]?.delta7?.vaccinated2
    ),
    `${Math.round(
      (resp[stateCode]?.total.vaccinated1 / resp[stateCode]?.meta?.population) *
        100
    )}`,
    `${Math.round(
      (resp[stateCode]?.total.vaccinated2 / resp[stateCode]?.meta?.population) *
        100
    )}`,
  ];
};

function App() {
  const [rows, setRows] = useState<IRow[]>([[]]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      const resp = (
        await axios.get(
          "https://raw.githubusercontent.com/covid19india/api/gh-pages/v4/min/data.min.json"
        )
      ).data;

      const _rows = [
        getRow(resp, "TT"),
        ...Object.keys(resp).map((stateCode: string): IRow => {
          return getRow(resp, stateCode);
        }),
      ];
      console.log(_rows);

      setLoading(false);
      setRows(_rows);
    };

    fn();
  }, []);

  return (
    <div className="App">
      <p>Hello World</p>
      <TableWrapper>
        <Table heading={heading} rows={rows} />
      </TableWrapper>
    </div>
  );
}

export default App;
