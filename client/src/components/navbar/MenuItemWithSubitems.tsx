import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem as MUIMenuItem,
  Collapse,
  IconButton,
} from "@mui/material";
// interfaces
import LinkItem from "../../interfaces/navbar/LinkItem";
import MenuSubItem from "./MenuSubItem";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface MenuItemProps {
  route: LinkItem;
}

const MenuItemWithSubitems = ({ route }: MenuItemProps) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setOpen(!open);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <IconButton size="small">{route.icon}</IconButton>
        </ListItemIcon>
        <ListItemText primary={route.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {/* popup menu over the listitem and close it when subitem clicked */}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {route &&
            route.subRoutes &&
            route.subRoutes.map((sRoute: LinkItem) => (
              <MenuSubItem
                key={`${sRoute.key}`}
                route={sRoute}
                onClick={handleClose}
              />
            ))}
        </Menu>
      </Collapse>
    </>
  );
};

export default MenuItemWithSubitems;
