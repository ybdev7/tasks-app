import React, { useContext, useEffect } from "react";
import { getLocale } from "./Theme";
import { ThemeContext, ThemeModeContext } from "./ThemeHandler";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const Layout: React.FC<React.ReactNode> = ({ children }) => {
  const { isDark, lang, color } = useContext(ThemeContext) as ThemeModeContext;

  console.log(
    `Layout theme: color=${color} darkness will be set to=${isDark}; lan will be set to ${lang}`
  );

  const t = createTheme(
    {
      palette: {
        mode: isDark ? "dark" : "light",
        primary: {
          main: color,
        },
        secondary: {
          main: "#78909c",
        },
      },
    },
    getLocale(lang)
  );
  return (
    <ThemeProvider theme={t}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default Layout;
