import React from "react";
import { getAllSettings } from "../utils/SettingsProvider";

export interface ThemeModeContext {
  isDark: boolean;
  setThemeMode: (isDark: boolean) => void;
  lang: string;
  setLang: (lang: string) => void;
  color: string;
  setThemeColor: (color: string) => void;
}
export const ThemeContext = React.createContext<ThemeModeContext | null>(null);

const ThemeHandler: React.FC<React.ReactNode> = ({ children }) => {
  const getIsDarkMode = (): boolean => {
    console.log("getting mode from local storage...");
    const theme = localStorage.getItem("preferred-theme");
    console.log(`getting mode from local storage...theme=${theme}`);
    if (theme) {
      const themePreference = localStorage.getItem("preferred-theme");
      if (themePreference === "dark") {
        return true;
      } else {
        return false;
      }
    } else return true;
  };

  //   returns en or fr, of en by default
  const getLanguage = (): string => {
    try {
      const s = getAllSettings();
      return s.language;
    } catch (ex) {
      return "en-US";
    }
  };

  const getColor = (): string => {
    try {
      const s = getAllSettings();
      return s.color;
    } catch (ex) {
      return "rgba(9,78,245,0.61)";
    }
  };

  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(getIsDarkMode());
  const [language, setLanguage] = React.useState<string>(getLanguage());
  const [color, setColor] = React.useState<string>(getColor());

  const setThemeColor = async (color: string) => {
    setColor(color);
  };

  const setThemeA = async (isDark: boolean) => {
    console.log(`inside setThemeA - isDark=${isDark}`);
    isDark
      ? localStorage.setItem("preferred-theme", "dark")
      : localStorage.setItem("preferred-theme", "light");
    setIsDarkMode(isDark);
  };

  // if fr, set fo fr; else - set to en
  const setLangA = async (lang: string) => {
    console.log(`inside setLangA - lang=${lang}`);
    setLanguage(lang);
  };
  return (
    <ThemeContext.Provider
      value={{
        isDark: isDarkMode,
        setThemeMode: setThemeA,
        lang: language,
        setLang: setLangA,
        color: color,
        setThemeColor: setThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeHandler;
