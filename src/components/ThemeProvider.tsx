'use client';

import { createContext, useContext, ReactNode } from 'react';

// Dark mode removed — site is always light
const ThemeContext = createContext<{ theme: 'light'; toggle: () => void }>({
    theme: 'light',
    toggle: () => {},
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <ThemeContext.Provider value={{ theme: 'light', toggle: () => {} }}>
            {children}
        </ThemeContext.Provider>
    );
}
