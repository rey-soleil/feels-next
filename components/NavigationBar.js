"use client";

import HomeIcon from "@mui/icons-material/Home";
import InsightsIcon from "@mui/icons-material/Insights";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { useState } from "react";

const listItems = [
  { to: "/", icon: <HomeIcon />, description: "Home" },
  // { to: "/log", icon: <CreateIcon />, description: "Log a mood" },
  // { to: "/history", icon: <HistoryIcon />, description: "See past moods" },
  { to: "/insights", icon: <InsightsIcon />, description: "Insights" },
  { to: "/login", icon: <LogoutRoundedIcon />, description: "Log out" },
];

export default function NavigationBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Button
        sx={{ minWidth: "0px" }}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
      >
        <MenuIcon sx={{ color: "black" }} fontSize="large" />
      </Button>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List>
          {listItems.map(({ to, icon, description }) => (
            <Link href={to} style={{ all: "unset" }} key={description}>
              <ListItem>
                <ListItemButton onClick={() => setIsDrawerOpen(false)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={description} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}
