import { useEffect, useState } from "react";

function useDarkMode() {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("theme");

        if (saved) {
            return saved === "dark";
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    function toggleDarkMode() {
        setDarkMode((prev) => !prev);
    }

    return {
        darkMode,
        toggleDarkMode,
    };
}

export default useDarkMode;