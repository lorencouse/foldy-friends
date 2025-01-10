"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render nothing on the server and until the theme is mounted
    return null;
  }

  return (
    <div>
      {theme === "dark" ? (
        <Button
          variant="ghost"
          className="hover:bg-inherit hover:text-black border-zinc-900 "
          size="icon"
          onClick={() => setTheme("light")}
        >
          <Sun className="w-6 h-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-inherit hover:text-black border-zinc-100 "
          onClick={() => setTheme("dark")}
        >
          <Moon className="w-6 h-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      )}
    </div>
  );
}
