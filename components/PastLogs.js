"use client";

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { useEffect, useState } from "react";
import { displayDateAsString } from "./PastLog";
import { getUserCode } from "./utils";

export default function PastLogs() {
  const [pastLogs, setPastLogs] = useState([]);

  async function getPastLogs() {
    const code = getUserCode(navigate);
    await fetch(`/logs/code/${code}`, {
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

  const formatAsString = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(undefined, {
      // weekday: "short",
      day: "numeric",
      month: "short",
      // year: "numeric",
    });
  };

  return (
    <>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        {pastLogs.map(({ createdAt, moods, activities }) => {
          return (
            <TimelineItem key={createdAt}>
              <TimelineOppositeContent color="textSecondary">
                {`${formatAsString(createdAt)} ${displayDateAsString(
                  createdAt
                )}`}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <p>
                  <b>I felt</b>{" "}
                  <span className="moods">{moods.join(", ")}</span>
                </p>
                <p>
                  <b>I was</b>{" "}
                  <span className="activities">{activities.join(", ")}</span>
                </p>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </>
  );

  // return (
  //   <>
  //     {Object.keys(logsGroupedByDate).map((date) => {
  //       const logsForDate = logsGroupedByDate[date];
  //       return (
  //         <div className="logsForASingleDate" key={date}>
  //           <h4>{formatAsString(date)}</h4>
  //           <VerticalTimeline layout="1-column" lineColor="black">
  //             {logsForDate.map((log) => (
  //               <VerticalTimelineElement
  //                 className="vertical-timeline-element--work"
  //                 contentStyle={{
  //                   background: "#4285f4",
  //                   color: "#ffffff",
  //                 }}
  //                 contentArrowStyle={{
  //                   borderRight: "7px solid  rgb(33, 150, 243)",
  //                 }}
  //                 date={displayDateAsString(log.createdAt)}
  //                 iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
  //                 // icon={<MoodIcon />}
  //               >
  //                 <p>
  //                   <b>I felt</b>{" "}
  //                   <span className="moods">{log.moods.join(", ")}</span>
  //                 </p>
  //                 <p>
  //                   <b>I was</b>{" "}
  //                   <span className="activities">
  //                     {log.activities.join(", ")}
  //                   </span>
  //                 </p>
  //               </VerticalTimelineElement>
  //             ))}
  //           </VerticalTimeline>
  //         </div>
  //       );
  //     })}
  //   </>
  // );
}
