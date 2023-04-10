"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
import LogsForASingleDate from "./LogsForASingleDate";
import { getUserCode } from "./utils";

export default function PastLogs() {
  const [logsGroupedByDate, setLogsGroupedByDate] = useState({});

  async function getPastLogs() {
    const code = getUserCode();
    await fetch(`api/logs?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const logsGroupedByDate = _(data)
          .groupBy((log) => new Date(log.createdAt).toLocaleDateString())
          .value();
        console.log({ logsGroupedByDate });
        setLogsGroupedByDate(logsGroupedByDate);
      });
  }

  useEffect(() => {
    getPastLogs();
  }, []);

  const convertDateToReadableString = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
      // year: "numeric",
    });
  };

  return (
    <>
      {Object.keys(logsGroupedByDate).map((date) => {
        const pastLogs = logsGroupedByDate[date];
        return (
          <div className="logsForASingleDate" key={date}>
            <h4 className="centered">
              <b>{convertDateToReadableString(date)}</b>
            </h4>
            <LogsForASingleDate pastLogs={pastLogs} />
          </div>
        );
      })}
    </>
  );
}
