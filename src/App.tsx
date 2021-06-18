import { IRow } from "./interfaces/Row";
import Table from "./components/Table/Table";
import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { STATE_NAMES } from "./constant";
import { TableWrapper } from "./styles";
import { Loading } from "./components/Loading";
import { convertToIndiaUnit } from "./utils/convertToIndianUnit";
import moment from "moment";

const heading = [
  "State",
  "ETA",
  "Vaccines administered per day",
  "Percentage of Population Vaccinated with Dose 1",
  "Percentage of Population Vaccinated with Dose 2",
];
// const rows: IRow[] = [["Delhi", "50%"]];

const getETA = (
  vaccinated1: string,
  vaccinated2: string,
  population: string
) => {
  const perDay = Math.round((Number(vaccinated1) + Number(vaccinated2)) / 7);
  const targetDate = moment().add(
    (parseInt(population) * 2) / perDay, // days remaining
    "days"
  );

  const now = moment();

  const years = targetDate.diff(now, "years");
  now.add(years, "years");
  const months = targetDate.diff(now, "months");
  now.add(months, "months");
  const days = targetDate.diff(now, "days");

  if (years > 0 && months > 0)
    return `${years} ${years > 1 ? "years" : "year"} and ${
      months > 1 ? `${months} months` : `a month`
    }`;

  if (months > 0 && days > 0)
    return `${months} ${months > 1 ? "months" : "month"} and ${
      days > 1 ? `${days} days` : `a day`
    }`;

  if (years > 0) return `${years} ${years > 1 ? "years" : "year"}`;
  if (months > 0) return `${months} ${months > 1 ? "months" : "month"}`;
  if (days > 0) return `${days} ${days > 1 ? "days" : "day"}`;

  return moment().to(targetDate);
};

const getAverageSpeed = (vaccinated1: string, vaccinated2: string) => {
  return convertToIndiaUnit(
    Math.round((Number(vaccinated1) + Number(vaccinated2)) / 7)
  );
};

const getRow = (resp: any, stateCode: string): IRow => {
  return [
    STATE_NAMES[stateCode],
    getETA(
      resp[stateCode]?.delta7?.vaccinated1,
      resp[stateCode]?.delta7?.vaccinated2,
      resp[stateCode]?.meta?.population
    ),
    getAverageSpeed(
      resp[stateCode]?.delta7?.vaccinated1,
      resp[stateCode]?.delta7?.vaccinated2
    ),
    `${convertToIndiaUnit(
      Math.round(
        (resp[stateCode]?.total.vaccinated1 /
          resp[stateCode]?.meta?.population) *
          100
      )
    )}%`,
    `${convertToIndiaUnit(
      Math.round(
        (resp[stateCode]?.total.vaccinated2 /
          resp[stateCode]?.meta?.population) *
          100
      )
    )}%`,
  ];
};

function App() {
  const [rows, setRows] = useState<IRow[]>([[]]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [target, setTarget] = useState<string>("2022-01-01"); // Date string in YYYY-MM-DD

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
        ...Object.keys(resp)
          .filter((stateCode) => stateCode !== "TT")
          .map((stateCode: string): IRow => {
            return getRow(resp, stateCode);
          }),
      ];
      console.log(_rows);

      setLoading(false);
      setRows(_rows);
    };

    fn();
  }, []);

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
  };

  return (
    <div className="App">
      <input type="date" value={target} onChange={handleDate} />
      {loading ? (
        <Loading />
      ) : (
        <TableWrapper>
          <Table heading={heading} rows={rows} />
        </TableWrapper>
      )}
    </div>
  );
}

export default App;
