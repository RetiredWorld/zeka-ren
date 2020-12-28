import React from "react";

const initContext:ITitleContext = {
    title: '',
};

export const TitleContext = React.createContext<ITitleContext>(initContext);
export const TitleConsumer = TitleContext.Consumer;
export const TitleProvider = TitleContext.Provider;

export interface ITitleContext {
    title: string
}
