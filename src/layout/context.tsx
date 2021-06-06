import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { IThemeMode } from '../components/public/tools';

interface ILayoutContext {
  theme: {
    themeMode: IThemeMode,
    setThemeMode: Dispatch<SetStateAction<IThemeMode>>,
  }
}

export const LayoutContextDefaultValue: ILayoutContext = {
  theme: {
    themeMode: 'light',
    setThemeMode: () => {},
  },
};

const LayoutContext = React.createContext<ILayoutContext>(LayoutContextDefaultValue);


const LayoutContextProvider: FC = ({ children }) => {

  const [ themeState, setThemeState ] = useState<IThemeMode>(typeof MyTheme !== 'undefined' ? MyTheme.themeMode : 'light');
  const defaultValue: ILayoutContext = {
    theme: {
      themeMode: themeState,
      setThemeMode: setThemeState,
    },
  };
  return (<LayoutContext.Provider value={defaultValue}>{ children }</LayoutContext.Provider>);
};

export const LayoutContextConsumer = LayoutContext.Consumer;

export default LayoutContextProvider;
