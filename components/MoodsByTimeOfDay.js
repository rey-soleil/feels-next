import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertToMoodsByTimeOfDay } from "./utils";

export default function MoodsByTimeOfDay({ pastLogs }) {
  const [moodsByTimeOfDay, setMoodsByTimeOfDay] = useState([]);
  const [hour, setHour] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    if (pastLogs.length === 0) return;

    const moodsByTimeOfDay = convertToMoodsByTimeOfDay(pastLogs);
    setMoodsByTimeOfDay(moodsByTimeOfDay);
    setHour(moodsByTimeOfDay[0].hour);
  }, [pastLogs]);

  useEffect(() => {
    const entryForHour = moodsByTimeOfDay.find((e) => e.hour === hour);
    entryForHour && entryForHour.moods && setMoods(entryForHour.moods);
  }, [hour]);

  return (
    moodsByTimeOfDay &&
    moodsByTimeOfDay.length > 0 && (
      <div className="insights">
        <div>
          <h4>At...</h4>
          <FormControl sx={{ width: "80%" }}>
            <Select
              value={hour}
              onChange={({ target }) => setHour(target.value)}
            >
              {moodsByTimeOfDay.map(({ hour }) => (
                <MenuItem key={hour} value={hour}>
                  {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <h4>I feel...</h4>
          {moods.map((mood) => (
            <div key={mood}>{mood}</div>
          ))}
        </div>
      </div>
    )
  );
}
