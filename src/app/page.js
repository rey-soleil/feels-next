"use client";

import CustomCard from "components/CustomCard";
import LogMood from "components/LogMood";
import PastLogsFetcher from "components/PastLogsFetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const cards = [
  { component: <LogMood />, title: "Log a mood" },
  { component: <PastLogsFetcher />, title: "Past logs" },
];
export default function Home() {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    }
    setUser(user);
  }, []);

  return user ? (
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
  ) : (
    <></>
  );
}
