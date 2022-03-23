import { enUS, frFR, esES, Localization } from "@mui/material/locale";

export const getLocale = (lang: string): Localization => {
  switch (lang) {
    case "en-US":
      return enUS;
    case "fr-FR":
      return frFR;
    case "es-ES":
      return esES;
    default:
      return enUS;
  }
};
