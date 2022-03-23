export interface SettingsConfig {
  color: string;
  language: string;
  isDarkMode: boolean;
}

export interface AllSettings extends SettingsConfig {
  allColors: SettingsColors;
}

export interface SettingsColors {
  blue: string;
  orange: string;
  green: string;
}

const getSettings = (): SettingsConfig => {
  const item = localStorage.getItem("settings1");
  try {
    if (item) {
      return JSON.parse(item) as SettingsConfig;
    } else {
      return {
        color: "rgba(9,78,245,0.61)",
        language: "en-US",
        isDarkMode: false,
      };
    }
  } catch (ex) {
    return {
      color: "rgba(9,78,245,0.61)",
      language: "en-US",
      isDarkMode: false,
    };
  }
};

export const getAllSettings = (): AllSettings => {
  const settings = getSettings();
  return {
    ...settings,
    allColors: {
      blue: "rgba(9,78,245,0.61)",
      orange: "#f97f59",
      green: "#a9f3c1",
    },
  }; //tbd - read from resource
};
