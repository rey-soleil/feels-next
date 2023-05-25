"use client";

import Correlations from "components/Correlations";
import CustomCard from "components/CustomCard";
import MoodsByTimeOfDay from "components/MoodsByTimeOfDay";
import { getUserCode } from "components/utils";
import { useEffect, useState } from "react";

export default function Insights() {
  const [pastLogs, setPastLogs] = useState([]);

  async function getPastLogs() {
    const code = getUserCode();
    await fetch(`api/logs?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPastLogs(data);
      });
  }

  useEffect(() => {
    getPastLogs();
  }, []);

  console.log({ pastLogs });

  return (
    <div className="m-10 p-10">
      <CustomCard
        title="Correlations"
        component={<Correlations pastLogs={pastLogs} />}
      />
      <CustomCard
        title="Moods by time of day"
        component={<MoodsByTimeOfDay pastLogs={pastLogs} />}
      />
    </div>
  );
}
