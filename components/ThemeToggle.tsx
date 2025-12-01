import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { Button } from './ui';

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check local storage or system preference on mount
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full w-9 h-9 border md:border-transparent hover:bg-accent hover:text-accent-foreground"
      title="Toggle theme"
    >
      {theme === "light" ? (
        <Icons.Sun className="h-4 w-4 transition-all" />
      ) : (
        <Icons.Moon className="h-4 w-4 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}