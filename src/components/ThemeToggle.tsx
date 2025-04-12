"use client";

import { useEffect, useState } from "react";
import { Flex, Icon } from "@/once-ui/components";
import styles from "./ThemeToggle.module.scss";
import { style } from "@/app/resources";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [theme, setTheme] = useState<"light" | "dark">(style.theme as "light" | "dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    // Update the data-theme attribute on the document element
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    
    // Store the theme preference in localStorage for persistence
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <Flex 
      className={`${styles.themeToggle} ${className || ""}`}
      onClick={toggleTheme}
      role="button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      }}
    >
      <Flex className={styles.iconContainer}>
        <Icon 
          name="sun" 
          className={`${styles.icon} ${styles.sunIcon} ${theme === "light" ? styles.active : ""}`} 
        />
      </Flex>
      <div className={`${styles.slider} ${theme === "dark" ? styles.sliderRight : ""}`} />
      <Flex className={styles.iconContainer}>
        <Icon 
          name="moon" 
          className={`${styles.icon} ${styles.moonIcon} ${theme === "dark" ? styles.active : ""}`} 
        />
      </Flex>
    </Flex>
  );
};