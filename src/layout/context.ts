import React, { Dispatch } from 'react';

export const initContext:IInfoContext = {
    title: '',
    navTitle: '',
    description: '',
};

const initContextValue: IInfoContextValue = {
    info: initContext,
    setInfo: null,
};

export const InfoContext = React.createContext<IInfoContextValue>(initContextValue);
export const InfoConsumer = InfoContext.Consumer;
export default InfoConsumer;
export const InfoProvider = InfoContext.Provider;

interface IInfoContextValue {
    info: IInfoContext
    setInfo: Dispatch<IInfoContext>
}

export interface IInfoContext {
    title: string
    navTitle: string
    description?: string
}
