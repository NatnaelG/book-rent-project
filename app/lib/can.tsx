"use client";

import { createContext, useContext } from "react";
import { createContextualCan } from "@casl/react";
// import defineAbilityFor from "./ability";

const AbilityContext = createContext<any>(undefined);

export const Can = createContextualCan(AbilityContext.Consumer);

export function AbilityWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AbilityContext.Provider value={undefined}>
      {children}
    </AbilityContext.Provider>
  );
}

export function useAbilityContext() {
  return useContext(AbilityContext);
}
