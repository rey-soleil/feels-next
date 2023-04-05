import _ from "lodash";

export const getUserCode = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || !user.sub) {
    // navigate("/login");
    return;
  }
  return user.sub;
};

/*
    correlations[mood][activity] = number of times those two have been logged together
*/
export const convertPastLogsToCorrelations = (pastLogs) => {
  let correlations = {};
  pastLogs.forEach(({ activities, moods }) => {
    moods.forEach((mood) => {
      if (!(mood in correlations)) {
        correlations[mood] = {};
      }
      activities.forEach((activity) => {
        if (!(activity in correlations[mood])) {
          correlations[mood][activity] = 0;
        }
        correlations[mood][activity] += 1;
      });
    });
  });
  return correlations;
};

/*
    correlationsList[i] = [correlations[mood][activity], mood, activity]
    sorted by decreasing correlation
*/
export const convertToCorrelationsList = (correlations) => {
  let correlationsList = [];
  Object.keys(correlations).forEach((mood) => {
    Object.keys(correlations[mood]).forEach((activity) => {
      correlationsList.push({
        mood,
        activity,
        correlation: correlations[mood][activity],
      });
    });
  });
  return correlationsList.sort((a, b) => b.correlation - a.correlation);
};

/*
    moodsByTimeOfDay[i] = { 
        hour: i, 
        moods: [mood1, mood2, ...], 
        activities: [activity1, activity2, ...] 
    }
*/
export const convertToMoodsByTimeOfDay = (pastLogs) => {
  const moodsByTimeOfDay = _(pastLogs)
    .map((log) => {
      return { ...log, hour: new Date(log.createdAt).getHours() };
    })
    .groupBy("hour")
    .map((logList, hour) => {
      let moods = [];
      let activities = [];
      logList.forEach((log) => {
        moods = moods.concat(log.moods);
        activities = activities.concat(log.activities);
      });
      return { hour, moods, activities };
    })
    .value();
  return moodsByTimeOfDay;
};
