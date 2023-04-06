"use client";

import { Button } from "@mui/material";
import _ from "lodash";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import GenericElementInput from "./GenericElementInput";
import { getUserCode } from "./utils";

export default function LogMood() {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");

  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = useState("");

  const [allActivities, setAllActivities] = useState([]);
  const [allMoods, setAllMoods] = useState([]);

  async function getAllActivitiesAndMoods() {
    const code = getUserCode();
    await fetch(`api/logs?code=${code}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let allActivities = [];
        let allMoods = [];
        _(data).forEach(({ activities, moods }) => {
          allActivities = allActivities.concat(activities);
          allMoods = allMoods.concat(moods);
        });
        allMoods = allMoods.concat([
          "sadness",
          "happiness",
          "fear",
          "anger",
          "surprise",
          "disgust",
        ]);
        setAllActivities(
          [...new Set(allActivities)].filter(
            (activity) => activity.split(" ").length < 4
          )
        );
        setAllMoods(
          [...new Set(allMoods)].filter((mood) => mood.split(" ").length < 4)
        );
      });
  }

  useEffect(() => {
    getAllActivitiesAndMoods();
  }, []);

  const submitLog = async () => {
    const code = getUserCode();
    await fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ moods, activities, code }),
    }).then((res) => console.log(res));
    setMoods([]);
    setMood("");
    setActivities([]);
    setActivity("");
    toast("Successfully logged mood!");
    window.location.reload();
  };

  return (
    <div className="log-mood">
      <div className="question">
        <h4>What do you feel?</h4>
        <GenericElementInput
          elements={moods}
          setElements={setMoods}
          element={mood}
          setElement={setMood}
          options={allMoods}
        />
      </div>
      <div className="question">
        <h4>What have you been doing?</h4>
        <GenericElementInput
          elements={activities}
          setElements={setActivities}
          element={activity}
          setElement={setActivity}
          options={allActivities}
        />
      </div>
      <Button
        variant="contained"
        onClick={submitLog}
        disabled={moods.length === 0 || activities.length === 0}
      >
        submit
      </Button>
      <Toaster position="bottom-center" />
    </div>
  );
}
