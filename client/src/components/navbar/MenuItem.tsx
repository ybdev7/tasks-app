import React from "react";
import { ListItem, ListItemText, Icon, IconButton } from "@mui/material";
import IcecreamIcon from "@mui/icons-material/Icecream";
import { NavLink } from "react-router-dom";

import LinkItem from "../../interfaces/navbar/LinkItem";

interface MenuItemProps {
  route: LinkItem;
  handleClick: () => void;
}

const MenuItem = ({ route, handleClick }: MenuItemProps) => {
  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    if (!route.enabled) {
      e.preventDefault();
    } else {
      handleClick();
    }
  };

  return (
    <>
      <NavLink
        to={`${route.path}`}
        style={{ textDecoration: "none", color: "inherit" }}
        key={route.key}
        onClick={handleNavigate}
      >
        <ListItem key={`menu-${route.key}`} button disabled={!route.enabled}>
          <IconButton>
            {" "}
            <Icon component={route.icon || IcecreamIcon} />
          </IconButton>
          <ListItemText>{route.title}</ListItemText>
        </ListItem>
      </NavLink>
    </>
  );
};

export default MenuItem;
