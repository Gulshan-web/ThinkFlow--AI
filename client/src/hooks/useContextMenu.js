import { useState, useEffect } from "react";

export default function useContextMenu() {
    const [menu, setMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        node: null,
    });

    const openMenu = (event, node) => {
        event.preventDefault();

        setMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
            node,
        });
    };

    const closeMenu = () => {
        setMenu((prev) => ({
            ...prev,
            visible: false,
        }));
    };

    useEffect(() => {
        const handleClick = () => closeMenu();

        const handleEscape = (e) => {
            if (e.key === "Escape") closeMenu();
        };

        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return {
        menu,
        openMenu,
        closeMenu,
    };
}