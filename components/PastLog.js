import React from "react";

export const displayDateAsString = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    //   day: "numeric",
    //   month: "short",
    //   year: "numeric",
  });
};

export default function PastLog({ log }) {
  return (
    <>
      <h4>{displayDateAsString(log.createdAt)}</h4>
      <p>You felt {log.moods.join(", ")}</p>
      <p>You were {log.activities.join(", ")}</p>
    </>
  );
}
