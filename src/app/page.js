"use client";

import CustomCard from "components/CustomCard";
import LogMood from "components/LogMood";
import PastLogs from "components/PastLogs";
import { useEffect, useState } from "react";

const cards = [
  { component: <LogMood />, title: "Log a mood" },
  { component: <PastLogs />, title: "Past logs" },
];
export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <div className="home">
      <h2>Welcome{user.given_name && `, ${user.given_name}`}!</h2>
      <div className="home-content">
        {cards.map((card) => (
          <CustomCard
            key={card.title}
            title={card.title}
            component={card.component}
          />
        ))}
      </div>
    </div>
  );
}
