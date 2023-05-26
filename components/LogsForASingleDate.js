import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";

export default function LogsForASingleDate({ pastLogs }) {
  const displayDateAsString = (createdAt) => {
    const date = new Date(createdAt);
    return date.toLocaleString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      //   day: "numeric",
      //   month: "short",
      //   year: "numeric",
    });
  };

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {pastLogs.map(({ createdAt, moods, activities }, i) => {
        return (
          <TimelineItem key={createdAt}>
            <TimelineOppositeContent color="textSecondary">
              {`${displayDateAsString(createdAt)}`}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              {i !== pastLogs.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <p>
                <b>I felt</b>{" "}
                <span className="moods">
                  {moods.map((mood, i) => (
                    <>
                      <a
                        key={mood}
                        href={`/moods/${mood}`}
                        className="hover:underline"
                      >
                        {mood}
                      </a>
                      <span>{i === moods.length - 1 ? "" : ", "}</span>
                    </>
                  ))}
                </span>
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
  );
}
