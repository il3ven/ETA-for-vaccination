import { IRow, ISort } from "./interfaces/Row";
import Table from "./components/Table/Table";
import axios from "axios";
import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { STATE_NAMES } from "./constant";
import { Loading } from "./components/Loading";
import { convertToIndiaUnit } from "./utils/convertToIndianUnit";
import moment from "moment";
import { useCallback } from "react";
import {
  TableWrapper,
  H1,
  P,
  Legend,
  Circle,
  Header,
  LegendWrapper,
  DateWrapper,
} from "./styles";

const headings = [
  { text: "State", value: "1" },
  { text: "ETA for everyone to get vaccinated", value: "2" },
  { text: "ETA for 70% people to get vaccinated", value: "3" },
  { text: "Vaccines administered per day", value: "4" },
  { text: "Percentage of Population Vaccinated with Dose 1", value: "5" },
  { text: "Percentage of Population Vaccinated with Dose 2", value: "6" },
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

  return { text, days: Math.round((parseInt(population) * 2) / perDay) };
};

const getAverageSpeed = (vaccinated1: string, vaccinated2: string) => {
  return {
    text: convertToIndiaUnit(
      Math.round((Number(vaccinated1) + Number(vaccinated2)) / 7)
    ),
    value: Math.round(
      (Number(vaccinated1) + Number(vaccinated2)) / 7
    ).toString(),
  };
};

const getPercentVaccinated = (vaccinated: string, population: string) => {
  return {
    text: `${convertToIndiaUnit(
      Math.round((Number(vaccinated) / Number(population)) * 100)
    )}%`,
    value: Math.round(
      (Number(vaccinated) / Number(population)) * 100
    ).toString(),
  };
};

function App() {
  const [resp, setResp] = useState();
  const [rows, setRows] = useState<IRow[]>([[]]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [target, setTarget] = useState<string>("2023-01-01"); // Date string in YYYY-MM-DD

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
        { text: STATE_NAMES[stateCode], value: stateCode },
        {
          text: eta100.text,
          value: eta100.days.toString(),
          color: `${
            eta100.days - moment(target).diff(moment(), "days") > 0
              ? "#ea3b3b"
              : "#1b8e1d"
          }`,
        },
        {
          text: eta70.text,
          value: eta70.days.toString(),
          color: `${
            eta70.days - moment(target).diff(moment(), "days") > 0
              ? "#ea3b3b"
              : "#1b8e1d"
          }`,
        },
        {
          ...getAverageSpeed(
            resp[stateCode]?.delta7?.vaccinated1,
            resp[stateCode]?.delta7?.vaccinated2
          ),
        },
        {
          ...getPercentVaccinated(
            resp[stateCode]?.total?.vaccinated1,
            resp[stateCode]?.meta?.population
          ),
        },
        {
          ...getPercentVaccinated(
            resp[stateCode]?.total?.vaccinated2,
            resp[stateCode]?.meta?.population
          ),
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

  const handleSort = (heading: string, sort: ISort) => {
    let index = -1;

    for (let i = 0; i < headings.length; i++) {
      if (headings[i].text === heading) {
        index = i;
        break;
      }
    }

    const [firstRow, ...oldRows] = rows;

    oldRows.sort((row1, row2) => {
      const value1 = row1[index].value;
      const value2 = row2[index].value;

      if (parseInt(value1) && parseInt(value2)) {
        /*prettier-ignore */
        return sort === "asc"
          ? parseInt(value1) > parseInt(value2) ? 1 : 0
          : parseInt(value2) > parseInt(value1) ? 1 : 0;
      }

      /*prettier-ignore */
      return sort === "asc"
        ? (row1[index].value > row2[index].value ? 1 : 0)
        : (row2[index].value > row1[index].value ? 1 : 0)
    });

    setRows([firstRow, ...oldRows]);
  };

  return (
    <div className="App">
      <Header>
        <H1>Will we be able to acheive our vaccination targets?</H1>
        <P>
          <DateWrapper>
            <span>Select the target date: </span>
            <input type="date" value={target} onChange={handleDate} />
          </DateWrapper>
          <LegendWrapper>
            <Legend>
              <Circle circleColor="#ea3b3b" />
              <span className="text">
                Not possible to fully vaccinate people before the selected
                target
              </span>
            </Legend>
            <Legend>
              <Circle circleColor="#1b8e1d" />
              <span className="text">Will be able to meet target</span>
            </Legend>
          </LegendWrapper>
        </P>
      </Header>
      {loading ? (
        <Loading />
      ) : (
        <TableWrapper>
          <Table heading={headings} rows={rows} handleSort={handleSort} />
        </TableWrapper>
      )}
    </div>
  );
}

export default App;
