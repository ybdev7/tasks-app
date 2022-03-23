import { SettingsSharp } from "@mui/icons-material";
import {
  Card,
  Divider,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ReactElement } from "react";
import {
  AllSettings,
  getAllSettings,
  SettingsConfig,
} from "../utils/SettingsProvider";
import { ThemeContext, ThemeModeContext } from "../theming/ThemeHandler";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const SettingsUI = (): ReactElement => {
  const [allSettings, setAllSettings] = useState<AllSettings>(getAllSettings());

  const { setThemeMode, setLang, setThemeColor } = useContext(
    ThemeContext
  ) as ThemeModeContext;

  useEffect(() => {
    // store settings after each change
    const settings: SettingsConfig = { ...allSettings };
    localStorage.setItem("settings1", JSON.stringify(settings));
  }, [allSettings]);

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setAllSettings({ ...allSettings, language: event.target.value as string });
    setLang(event.target.value as string);
  };

  const onThemeChange = (event: React.MouseEvent<HTMLElement>, value: any) => {
    console.log(`value=${value} `);

    //value is null if the same button (dark/light) is clicked more then once in a row
    if (value) {
      const isDark = value === "dark";
      setThemeMode(isDark);
      setAllSettings({ ...allSettings, isDarkMode: isDark });
    }
  };

  const handleColorChange = (event: SelectChangeEvent) => {
    setAllSettings({ ...allSettings, color: event.target.value as string });
    setThemeColor(event.target.value as string);
  };

  return (
    <>
      <Card sx={{ minWidth: 200, maxWidth: 800 }}>
        <Stack
          direction={{ xs: "column" }}
          spacing={{ xs: 1, sm: 2, md: 10 }}
          m={4}
        >
          <FormControl component="fieldset">
            <FormLabel>Light or Dark Mode</FormLabel>
            <ToggleButtonGroup
              value={allSettings.isDarkMode ? "dark" : "light"}
              exclusive
              onChange={onThemeChange}
              aria-label="text alignment"
            >
              <ToggleButton value="light" aria-label="light theme">
                <LightModeIcon />
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark teme">
                <DarkModeIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel>Color</FormLabel>
            <Select
              labelId="settings-color-select-label"
              id="settings-color-select-label"
              value={allSettings.color}
              label="Color"
              onChange={handleColorChange}
            >
              <MenuItem value={allSettings.allColors["blue"]}>Blue</MenuItem>
              <MenuItem value={allSettings.allColors["orange"]}>
                Orange
              </MenuItem>
              <MenuItem value={allSettings.allColors["green"]}>Green</MenuItem>
            </Select>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel>Language</FormLabel>
            <Select
              labelId="settings-language-select-label"
              id="settings-language-select-label"
              value={allSettings.language}
              label="Language"
              onChange={handleLanguageChange}
            >
              <MenuItem value={"en-US"}>English</MenuItem>
              <MenuItem value={"fr-FR"}>French</MenuItem>
              <MenuItem value={"es-ES"}>Spanish</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Card>
    </>
  );
};

export default SettingsUI;
