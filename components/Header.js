import { Avatar } from "@mui/material";
import Link from "next/link";
import NavigationBar from "./NavigationBar";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (location.pathname === "/login") {
    return (
      <div className="header header-login">
        <h1>feels</h1>
      </div>
    );
  }

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
