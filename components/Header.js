"use client";

import { Avatar } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  }, []);

  return (
    <>
      <div className="header">
        <NavigationBar />
        <Link href="/" style={{ textDecoration: "none" }}>
          <h1>feels</h1>
        </Link>
        <Avatar src={user && user.picture ? user.picture : ""} />
      </div>
    </>
  );
}
