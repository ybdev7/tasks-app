import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeContext, ThemeModeContext } from "../../theming/ThemeHandler";
import { logoIcon, logoName } from "./config";
import Icon from "@mui/material/Icon";
import List from "@mui/material/List";
import LinkItem from "../../interfaces/navbar/LinkItem";
import MenuItem from "./MenuItem";

import { routes } from "./config";
import { Drawer, ListItem, ListItemText } from "@mui/material";

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClick = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* do not change the navbar to dark mode*/}
      <AppBar enableColorOnDark>
        <Toolbar>
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

          <Typography
            style={{ fontStyle: "oblique" }}
            sx={{ flexGrow: 1 }}
            color="inherit"
          >
            {logoName}
          </Typography>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List
              style={{ display: "flex", flexDirection: "column", padding: 0 }}
            >
              {routes.map((route: LinkItem) => (
                <>
                  <ListItem key={`listitem-${route.key}`}>
                    <MenuItem
                      key={`key-${route.key}`}
                      route={route}
                      handleClick={handleClick}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
