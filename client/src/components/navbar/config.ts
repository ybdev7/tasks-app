// icons
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";

// // interface
import LinkItem from "../../interfaces/navbar/LinkItem";
import { ComponentType } from "react";

//main logo on navbar
export const logoIcon: ComponentType = EmojiFoodBeverageIcon;

//main text on navbar
export const logoName = "Timely Tasks";

export const routes: Array<LinkItem> = [
  {
    key: "router-home",
    title: "Tasks",
    tooltip: "Tasks",
    path: "/",
    enabled: true,
    icon: TaskAltOutlinedIcon,
    appendDivider: true,
  },
  {
    key: "router-settings",
    title: "Settings",
    tooltip: "Settings",
    path: "/settings",
    enabled: true,
    icon: SettingsOutlinedIcon,
  },

  {
    key: "router-about",
    title: "About",
    tooltip: "About",
    path: "/about",
    enabled: true,
    icon: InfoOutlinedIcon,
  },
];
