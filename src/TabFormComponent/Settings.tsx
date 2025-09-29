import type { ChangeEvent } from "react";
import type { TabComponentProps, ThemeOption } from "./types";

const Settings = ({ data, setData }: TabComponentProps) => {
  const { theme } = data;

  const handleDataChange = (event: ChangeEvent<HTMLInputElement>) => {
    const themeName = event.target.name as ThemeOption;
    setData((prevState) => ({
      ...prevState,
      theme: themeName,
    }));
  };

  return (
    <div className="settings">
      <div className="settings-input">
        <label>
          <input
            type="radio"
            name="dark"
            checked={theme === "dark"}
            onChange={handleDataChange}
          />
          Dark
        </label>
        <label>
          <input
            type="radio"
            name="light"
            checked={theme === "light"}
            onChange={handleDataChange}
          />
          Light
        </label>
      </div>
      <div />
    </div>
  );
};

export default Settings;
