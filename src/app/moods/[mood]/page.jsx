"use client";

import CustomCard from "components/CustomCard";
import PastLogs from "components/PastLogs";
import { getUserCode } from "components/utils";
import _ from "lodash";
import { useEffect, useState } from "react";

export default function Mood({ params }) {
  const [logsGroupedByDate, setLogsGroupedByDate] = useState({});

  const {mood} = params;
  
  async function getPastLogs() {
    const code = getUserCode();
    await fetch(`/api/moods/${mood}/?code=${code}`, {
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

  return (
    <CustomCard
    title={`Logs for mood ${mood}`}
    component={<PastLogs logsGroupedByDate={logsGroupedByDate} />}
  />
  );
}
