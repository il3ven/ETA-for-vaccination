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
import { useCallback } from "react";

const heading = [
  { text: "State" },
  { text: "ETA for everyone to get vaccinated" },
  { text: "ETA for 70% to get vaccinated" },
  { text: "Vaccines administered per day" },
  { text: "Percentage of Population Vaccinated with Dose 1" },
  { text: "Percentage of Population Vaccinated with Dose 2" },
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

  let text = moment().to(targetDate);

  if (years > 0 && months > 0)
    text = `${years} ${years > 1 ? "years" : "year"} and ${
      months > 1 ? `${months} months` : `a month`
    }`;
  else if (months > 0 && days > 0)
    text = `${months} ${months > 1 ? "months" : "month"} and ${
      days > 1 ? `${days} days` : `a day`
    }`;
  else if (years > 0) text = `${years} ${years > 1 ? "years" : "year"}`;
  else if (months > 0) text = `${months} ${months > 1 ? "months" : "month"}`;
  else if (days > 0) text = `${days} ${days > 1 ? "days" : "day"}`;

  return { text, days: (parseInt(population) * 2) / perDay };
};

const getAverageSpeed = (vaccinated1: string, vaccinated2: string) => {
  return convertToIndiaUnit(
    Math.round((Number(vaccinated1) + Number(vaccinated2)) / 7)
  );
};

function App() {
  const [resp, setResp] = useState();
  const [rows, setRows] = useState<IRow[]>([[]]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [target, setTarget] = useState<string>("2022-01-01"); // Date string in YYYY-MM-DD

  const getRow = useCallback(
    (resp: any = {}, stateCode: string): IRow => {
      const eta100 = getETA(
        resp[stateCode]?.delta7?.vaccinated1,
        resp[stateCode]?.delta7?.vaccinated2,
        resp[stateCode]?.meta?.population
      );

      const eta70 = getETA(
        resp[stateCode]?.delta7?.vaccinated1,
        resp[stateCode]?.delta7?.vaccinated2,
        (0.7 * parseInt(resp[stateCode]?.meta?.population)).toString()
      );

      return [
        { text: STATE_NAMES[stateCode] },
        {
          text: eta100.text,
          color: `${
            eta100.days - moment(target).diff(moment(), "days") > 0
              ? "#ea3b3b"
              : "#4848e8"
          }`,
        },
        {
          text: eta70.text,
          color: `${
            eta70.days - moment(target).diff(moment(), "days") > 0
              ? "#ea3b3b"
              : "#4848e8"
          }`,
        },
        {
          text: getAverageSpeed(
            resp[stateCode]?.delta7?.vaccinated1,
            resp[stateCode]?.delta7?.vaccinated2
          ),
        },
        {
          text: `${convertToIndiaUnit(
            Math.round(
              (resp[stateCode]?.total.vaccinated1 /
                resp[stateCode]?.meta?.population) *
                100
            )
          )}%`,
        },
        {
          text: `${convertToIndiaUnit(
            Math.round(
              (resp[stateCode]?.total.vaccinated2 /
                resp[stateCode]?.meta?.population) *
                100
            )
          )}%`,
        },
      ];
    },
    [target]
  );

  useEffect(() => {
    const fn = async () => {
      setLoading(true);

      const resp = (
        await axios.get(
          "https://raw.githubusercontent.com/covid19india/api/gh-pages/v4/min/data.min.json"
        )
      ).data;

      setLoading(false);
      setResp(resp);
    };

    fn();
  }, []);

  useEffect(() => {
    const _rows = [
      getRow(resp, "TT"),
      ...Object.keys(resp || {})
        .filter((stateCode) => stateCode !== "TT")
        .map((stateCode: string): IRow => {
          return getRow(resp, stateCode);
        }),
    ];

    setRows(_rows);
  }, [resp, getRow]);

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setTarget(e.target.value);
  };

  const handleSort = (index: number) => {};

  return (
    <div className="App">
      <input type="date" value={target} onChange={handleDate} />
      {loading ? (
        <Loading />
      ) : (
        <TableWrapper>
          <Table heading={heading} rows={rows} handleSort={handleSort} />
        </TableWrapper>
      )}
    </div>
  );
}

export default App;
