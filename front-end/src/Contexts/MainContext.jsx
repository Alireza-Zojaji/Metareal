import React, { createContext, useContext, useEffect, useState } from "react";
import { MapboxContextProvider } from "./MapboxContext/MapboxContext";
import GatewayContextProvider from "./GatewayContext/GatewayContext";
import { StoryContextProvider } from "./StoryContext/StoryContext";
export const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  return (
    <MainContext.Provider value={{}}>
      <StoryContextProvider>
        <GatewayContextProvider>
          <MapboxContextProvider>{children}</MapboxContextProvider>
        </GatewayContextProvider>
      </StoryContextProvider>
    </MainContext.Provider>
  );
};
export const useMainContext = () => MainContextProvider(MainContext);
