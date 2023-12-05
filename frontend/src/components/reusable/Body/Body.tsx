// STATE
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";
import { ReactNode } from "react";

export type BodyProps = {
  children: ReactNode,
  className: string
}

export const Body = ({ children, className }: BodyProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  return (
    <p
      className={`${
        darkMode ? "text-slate-50" : "text-slate-900"
      } text-base font-normal ${className}`}
    >
      {children}
    </p>
  );
};
