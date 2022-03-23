import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
} from "@mui/material";

import { NavLink } from "react-router-dom";

// models
import LinkItem from "../../interfaces/navbar/LinkItem";

interface MenuSubItemProps {
  route: LinkItem;
  onClick: any;
}

/**
 * Subitem for link item on the navigational bar
 * @param param0
 * @returns
 */
const MenuSubItem = ({ route, onClick }: MenuSubItemProps) => {
  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    onClick(); //closes the menu
    if (!route.enabled) e.preventDefault();
  };

  return (
    <NavLink
      to={`${route.path}`}
      style={{ textDecoration: "none", color: "inherit" }}
      key={route.key}
      onClick={handleNavigate}
    >
      <Tooltip title={route.tooltip || ""} placement="right">
        <ListItem button disabled={!route.enabled}>
          <ListItemIcon>
            <IconButton size="small">{route.icon}</IconButton>
          </ListItemIcon>
          <ListItemText primary={route.title} />
        </ListItem>
      </Tooltip>
    </NavLink>
  );
};

export default MenuSubItem;
