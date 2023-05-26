"use client";

import LogsForASingleDate from "./LogsForASingleDate";
import { convertDateToReadableString } from "./utils";

export default function PastLogs({ logsGroupedByDate }) {
  if (!logsGroupedByDate) return <></>;

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
