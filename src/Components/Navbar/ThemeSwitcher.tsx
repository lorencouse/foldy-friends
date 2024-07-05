import React, { useEffect } from "react";
import { MoonSvg, SunSvg } from "../svgPaths";
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();


  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="dark-mode-toggle flex items-center justify-center content-center mt-2 drop-shadow-md">
      <label className="swap swap-rotate ">
        <input
          type="checkbox"
          className="theme-controller"
          onClick={() => toggleTheme()}
        />
        {SunSvg}
        {MoonSvg}
      </label>
    </div>
  );
};

export default ThemeSwitcher;
