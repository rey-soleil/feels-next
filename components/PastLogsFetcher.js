"use client";

import _ from "lodash";
import { useEffect, useState } from "react";
import PastLogs from "./PastLogs";
import { getUserCode } from "./utils";

export default function PastLogsFetcher() {
  const [logsGroupedByDate, setLogsGroupedByDate] = useState({});

  async function getPastLogs() {
    const code = getUserCode();
    await fetch(`/api/logs?code=${code}`, {
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

  return <PastLogs logsGroupedByDate={logsGroupedByDate} />;
}
