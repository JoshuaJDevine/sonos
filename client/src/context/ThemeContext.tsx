import {createContext, useContext} from "react";

export enum Theme {
    Dark = 'Dark',
    Light = 'Light'
}

export type ThemeContextType = {
    theme: Theme;
    setTheme: (Theme: Theme) => void;
}

export type ThemeContextWFColor = {
    color: any;
    setColor: any;
}

export type ThemeContextWFSize = {
    size: any;
    setSize: any;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, setTheme: theme => console.warn('no theme provider')});
// @ts-ignore
export const WFColorContext = createContext<ThemeContextWFColor>({color: "#ff4500", setColor: color => console.warn("no theme provider") });
// @ts-ignore
export const WFSize = createContext<ThemeContextWFSize>({size: 2, setSize: size => console.warn("no theme provider") });

export const useTheme = () => useContext(ThemeContext);
export const useColor = () => useContext(WFColorContext);
export const useSize = () => useContext(WFSize);
