// Employing the createContext property and useReducer hook go establish darkMode
import { createContext, useReducer, Dispatch } from "react";
import { theme } from "./theme";

type ThemeContextProviderProps = {
  children: React.ReactNode
}


type InitialStateType = {
  darkMode: boolean,
}

const INITIAL_STATE = { darkMode: false };

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
};

export enum Types {
  Toggle = "TOGGLE",
}

type ThemePayload = {
  [Types.Toggle]: {
    darkMode: boolean;
  };
};

export type ThemeAction = ActionMap<ThemePayload>[keyof ActionMap<
  ThemePayload
  >];
  
export const ThemeContext = createContext<{
  state: InitialStateType; 
  dispatch: Dispatch<ThemeAction>}>({ state: INITIAL_STATE, dispatch: () => null})
const themeReducer = (state: InitialStateType, action: ThemeAction) => {
  switch (action.type) {
    case "TOGGLE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  return (
    // Setting the ThemeContext provider for the children within to look to for context
    <ThemeContext.Provider value={{ state, dispatch}}>
      {children}
    </ThemeContext.Provider>
  );
};
