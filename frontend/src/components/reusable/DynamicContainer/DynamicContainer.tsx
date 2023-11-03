// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context/context";

type DynamicContainerProps = {
  children: React.ReactNode
}

export const DynamicContainer = ({ children }: DynamicContainerProps) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      }  mt-2 mx-2 p-3 rounded-xl`}
    >
      {children}
    </div>
  );
};
