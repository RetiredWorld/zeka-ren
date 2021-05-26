import React, { createContext, Dispatch, FC, useState } from 'react';

type ColorMode = 'dark' | 'light'

const COLOR_KEY_NAME = 'color-mode';

function getInitialColorMode(): ColorMode {
  const persistedColorPreference = window.localStorage.getItem(COLOR_KEY_NAME) as ColorMode;
  const hasPersistedPreference = typeof persistedColorPreference === 'string';

  if (hasPersistedPreference) {
    return persistedColorPreference;
  }

  const mql = window.matchMedia('(prefers-color-schema: dark)')
  const hasMql = typeof mql.matches === 'boolean';

  if (hasMql) {
    return mql.matches ? 'dark' : 'light';
  }
}

interface ThemeContextValue {
  colorMode: ColorMode
  setColorMode: Dispatch<React.SetStateAction<ColorMode>>
}

export const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'light',
  setColorMode: null,
});


export const ThemeProvider: FC = ({ children }) => {
  const [ colorMode, rawSetColorMode ] = useState<ColorMode>(getInitialColorMode);

  const setColorMode = (value) => {
    rawSetColorMode(value);

    window.localStorage.setItem(COLOR_KEY_NAME, value);
  }

  return (<ThemeContext.Provider value={{ colorMode, setColorMode}}>
    {children}
  </ThemeContext.Provider>);
};
