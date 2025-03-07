import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "./button";

import { Moon, Sun, SunMoon } from "lucide-react";

export enum Theme {
    Dark = "dark",
    Light = "light",
    System = "system",
}

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: Theme.System,
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ children, defaultTheme = Theme.System, storageKey = "vite-ui-theme", ...props }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};

export function ThemeToggle({ className = "" }: { className?: string }) {
    const { setTheme, theme } = useTheme();

    const toggleTheme = () => {
        if (theme === Theme.Light) {
            setTheme(Theme.Dark);
            return;
        } else if (theme === Theme.Dark) {
            setTheme(Theme.System);
            return;
        } else if (theme === Theme.System) {
            setTheme(Theme.Light);
            return;
        }
    };

    const showIcon = () => {
        if (theme === Theme.Light) {
            return <Sun />;
        } else if (theme === Theme.Dark) {
            return <Moon />;
        } else if (theme === Theme.System) {
            return <SunMoon />;
        }
    };

    return (
        <Button variant="outline" className={className} onClick={() => toggleTheme()}>
            {showIcon()}
        </Button>
    );
}
