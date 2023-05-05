import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  convertPastLogsToCorrelations,
  convertToCorrelationsList,
} from "./utils";

export default function Correlations({ pastLogs }) {
  const [mood, setMood] = useState("");
  const [correlations, setCorrelations] = useState({});

  useEffect(() => {
    if (pastLogs.length === 0) return;

    const correlations = convertPastLogsToCorrelations(pastLogs);
    const correlationsList = convertToCorrelationsList(correlations);
    const mood = correlationsList[0]["mood"];

    setCorrelations(correlations);
    setMood(mood);
  }, [pastLogs]);

  console.log({ mood, correlations });

  return (
    !!mood && (
      <div className="insights">
        <div>
          <h4>I feel...</h4>
          <FormControl sx={{ width: "80%" }}>
            <Select
              value={mood}
              onChange={({ target }) => setMood(target.value)}
            >
              {Object.keys(correlations)
                .sort()
                .map((mood) => (
                  <MenuItem key={mood} value={mood}>
                    {mood}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <h4>When I am...</h4>
          {Object.keys(correlations).length > 0 &&
            Object.keys(correlations[mood]).map((activity) => (
              <p key={activity}>
                <span>{activity}</span>{" "}
                <span>({correlations[mood][activity]}x)</span>
              </p>
            ))}
        </div>
      </div>
    )
  );
}
